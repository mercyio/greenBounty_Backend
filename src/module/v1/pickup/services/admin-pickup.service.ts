import { BadRequestException, Injectable } from '@nestjs/common';
import { Pickup, PickupDocument } from '../schema/pickup.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PickupStatusEnum } from 'src/common/enums/transaction.enum';
import { AssignRecyclerDto } from '../dto/pickup.dto';
import { PaginationDto } from '../../repository/dto/repository.dto';
import { RepositoryService } from '../../repository/repository.service';
import { UserService } from '../../user/services/user.service';
import { SettingsService } from '../../settings/settings.service';
import { BasketTypeEnum } from 'src/common/enums/basket.enum';
import {
  PickupHistory,
  PickupHistoryDocument,
} from '../schema/pickup-hystory.schema';

@Injectable()
export class AdminPickupService {
  constructor(
    @InjectModel(Pickup.name)
    private pickupModel: Model<PickupDocument>,
    @InjectModel(PickupHistory.name)
    private pickupHistoryModel: Model<PickupHistoryDocument>,
    private repositoryService: RepositoryService,
    private userService: UserService,
    private settingService: SettingsService,
  ) {}

  //   async assignRecycler(pickupId: string, payload: AssignRecyclerDto) {
  //     const { recycler } = payload;

  //     const pickup = await this.findPickupById(pickupId);

  //     if (pickup.status !== PickupStatusEnum.Pending) {
  //       throw new BadRequestException('Pickup request is not in pending state');
  //     }

  //     return await this.pickupModel.findByIdAndUpdate(
  //       pickupId,
  //       {
  //         assignedRecycler: recycler,
  //         status: PickupStatusEnum.Accepted,
  //         acceptedAt: new Date(),
  //       },
  //       { new: true },
  //     );
  //   }

  //   async assignRecyclingPoint(pickupId: string) {
  //     const pickup = await this.findPickupById(pickupId);

  //     if (pickup.status !== PickupStatusEnum.Accepted) {
  //       throw new BadRequestException(
  //         'Pickup request must be accepted before completion',
  //       );
  //     }

  //     const { standardBasketRecyclingPoint, premiumBasketRecyclingPoint } =
  //       await this.settingService.getSettings();

  //     const points =
  //       pickup.user.basket === BasketTypeEnum.STANDARD
  //         ? standardBasketRecyclingPoint
  //         : premiumBasketRecyclingPoint;

  //     // Update user's wallet with points
  //     const [result] = await Promise.all([
  //       this.pickupModel.findByIdAndUpdate(
  //         pickupId,
  //         {
  //           status: PickupStatusEnum.Completed,
  //           isRewarded: true,
  //           rewardedAt: new Date(),
  //           pointsAwarded: points,
  //         },
  //         { new: true },
  //       ),
  //       this.userService.updateUserById(pickup.user._id.toString(), {
  //         $inc: { wallet: points },
  //       }),
  //       await this.createPickupHistory(pickup.user._id.toString(), pickupId),
  //     ]);

  //     return result;
  //   }

  //   async findPickupById(pickupId: string) {
  //     const pickup = await this.pickupModel
  //       .findOne({
  //         _id: pickupId,
  //         isDeleted: { $ne: true },
  //       })
  //       .populate('user', 'basket');

  //     if (!pickup) {
  //       throw new BadRequestException('invalid pickup request');
  //     }
  //     return pickup;
  //   }

  //   async getAllPendingRequest(query: PaginationDto) {
  //     return await this.repositoryService.paginate({
  //       model: this.pickupModel,
  //       query,
  //       options: { status: PickupStatusEnum.Pending, isDeleted: { $ne: true } },
  //     });
  //   }

  //   async getAllPickupRequestsStatus(query: PaginationDto) {
  //     return await this.repositoryService.paginate({
  //       model: this.pickupModel,
  //       query,
  //       options: { isDeleted: { $ne: true } },
  //     });
  //   }

  //   async createPickupHistory(userId: string, pickupId: string) {
  //     const pickup = await this.findPickupById(pickupId);

  //     return (await this.pickupHistoryModel.create(pickup)).populate(
  //       'user pickup',
  //     );
  //   }
}
