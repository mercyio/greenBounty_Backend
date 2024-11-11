import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PickupStatusEnum } from 'src/common/enums/transaction.enum';
import { UserDocument } from '../../user/schemas/user.schema';
import { CreatePickupDto } from '../dto/pickup.dto';
import { Pickup, PickupDocument } from '../schema/pickup.schema';
import { RecycleItemService } from '../../recycle/recycle.service';

@Injectable()
export class UserPickupService {
  constructor(
    @InjectModel(Pickup.name)
    private pickupModel: Model<PickupDocument>,
    private recycleItemService: RecycleItemService,
  ) {}

  async request(user: UserDocument, payload: CreatePickupDto) {
    const { pickupDate } = payload;

    const pendingRequest = await this.pickupModel.exists({
      user: user._id,
      status: PickupStatusEnum.Pending,
    });

    if (pendingRequest) {
      throw new BadRequestException(
        'You already have a pending pickup request',
      );
    }

    // Validate pickup date is in the future
    if (pickupDate && new Date(pickupDate) < new Date()) {
      throw new BadRequestException('Pickup date is invalid');
    }

    const items = await this.recycleItemService.findUserItems(
      user._id.toString(),
    );

    await this.recycleItemService.softDelete(user._id.toString());

    await this.recycleItemService.createRecycleHistory(user._id.toString());

    return await this.pickupModel.create({
      ...payload,
      user: user._id,
      recycleItems: items,
      status: PickupStatusEnum.Pending,
      createdAt: new Date(),
    });
  }
}
