import { BadRequestException, Injectable } from '@nestjs/common';
import { Pickup, PickupDocument } from '../schema/pickup.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PickupStatusEnum } from 'src/common/enums/transaction.enum';
import { AssignRecyclerDto } from '../dto/pickup.dto';

@Injectable()
export class AdminPickupService {
  constructor(
    @InjectModel(Pickup.name)
    private pickupModel: Model<PickupDocument>,
  ) {}

  async assignRecycler(pickupId: string, payload: AssignRecyclerDto) {
    const { recycler } = payload;

    const pickup = await this.pickupModel.findById(pickupId);

    if (!pickup) {
      throw new BadRequestException('invalid pickup request');
    }

    if (pickup.status !== PickupStatusEnum.Pending) {
      throw new BadRequestException('Pickup request is not in pending state');
    }

    return await this.pickupModel.findByIdAndUpdate(
      pickupId,
      {
        assignedRecycler: recycler,
        status: PickupStatusEnum.Accepted,
        acceptedAt: new Date(),
      },
      { new: true },
    );
  }
}
