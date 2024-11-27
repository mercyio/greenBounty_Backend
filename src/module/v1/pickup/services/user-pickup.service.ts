import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PickupStatusEnum } from 'src/common/enums/transaction.enum';
import { UserDocument } from '../../user/schemas/user.schema';
import { CreatePickupDto } from '../dto/pickup.dto';
import { Pickup, PickupDocument } from '../schema/pickup.schema';
import { RecycleItemService } from '../../recycle/recycle.service';
import { PaginationDto } from '../../repository/dto/repository.dto';
import { RepositoryService } from '../../repository/repository.service';
import {
  PickupHistory,
  PickupHistoryDocument,
} from '../schema/pickup-hystory.schema';

@Injectable()
export class UserPickupService {
  constructor(
    @InjectModel(Pickup.name)
    private pickupModel: Model<PickupDocument>,
    private recycleItemService: RecycleItemService,
    @InjectModel(PickupHistory.name)
    private pickupHistoryModel: Model<PickupHistoryDocument>,
    private repositoryService: RepositoryService,
  ) {}

  async createRequest(user: UserDocument, payload: CreatePickupDto) {
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

    if (pickupDate && new Date(pickupDate) < new Date()) {
      throw new BadRequestException('Pickup date is invalid');
    }

    const items = await this.recycleItemService.findItemsByUserId(
      user._id.toString(),
    );

    if (!items) {
      throw new NotFoundException(
        `Your basket must contain at least 50kg items to be eligible for pickup.`,
      );
    }

    await this.recycleItemService.softDelete(user._id.toString());

    // await this.recycleItemService.createRecycleHistory(user._id.toString());

    return await this.pickupModel.create({
      ...payload,
      user: user._id,
      recycleItems: items,
      status: PickupStatusEnum.Pending,
      createdAt: new Date(),
    });
  }

  async PendingRequest(user: UserDocument) {
    return await this.pickupModel.findOne({
      user: user._id,
      status: PickupStatusEnum.Pending,
      isDeleted: { $ne: true },
    });
  }

  async PickupHistory(user: UserDocument, query?: PaginationDto) {
    return await this.repositoryService.paginate({
      model: this.pickupHistoryModel,
      query,
      options: { user: user._id },
    });
  }
}
