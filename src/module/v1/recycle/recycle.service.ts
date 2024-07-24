import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../user/schemas/user.schema';
import { BasketTypeEnum } from 'src/common/enums/basket.enum';
import {
  PREMIUM_ALLOWED_ITEMS,
  STANDARD_ALLOWED_ITEMS,
} from 'src/common/enums/recycle.enum';
import { BasketService } from '../basket/basket.service';
import { Recycle, RecycleDocument } from './schema/recycle.schema';
import { PaginationDto } from '../repository/dto/repository.dto';
import { RepositoryService } from '../repository/repository.service';
import { BaseRepositoryService } from '../repository/base.service';
import { RecycleItemDto } from './dto/recycle.dto';
import {
  RecycleHistory,
  RecycleHistoryDocument,
} from './schema/recycle-hystory.schema';

@Injectable()
export class RecycleItemService extends BaseRepositoryService<RecycleDocument> {
  constructor(
    @InjectModel(Recycle.name)
    private recycleModel: Model<RecycleDocument>,
    @InjectModel(RecycleHistory.name)
    private recycleHistoryModel: Model<RecycleHistoryDocument>,
    private basketService: BasketService,
    private repositoryService: RepositoryService,
  ) {
    super(recycleModel);
  }

  async add(user: UserDocument, payload: RecycleItemDto) {
    const { item, quantity } = payload;

    const basket = await this.basketService.getUserBasket(user._id.toString());

    if (!basket) {
      throw new NotFoundException(' select a basket first before proceeding');
    }

    const allowedItems =
      basket.plan === BasketTypeEnum.PREMIUM
        ? PREMIUM_ALLOWED_ITEMS
        : STANDARD_ALLOWED_ITEMS;

    if (!allowedItems.includes(item)) {
      throw new BadRequestException(
        `Your ${basket.plan.toString().toLowerCase()} basket cannot recycle ${item.toLowerCase()}. Please upgrade to premium for more options.`,
      );
    }

    return await this.recycleModel.create({
      user: user._id,
      basket,
      item,
      quantity,
    });
  }

  async update(user: UserDocument, itemId: string, payload: RecycleItemDto) {
    const { item, quantity } = payload;

    await this.checkRecycleItemExist(user._id.toString(), itemId);
    const basket = await this.basketService.getUserBasket(user._id.toString());

    const allowedItems =
      basket.plan === BasketTypeEnum.PREMIUM
        ? PREMIUM_ALLOWED_ITEMS
        : STANDARD_ALLOWED_ITEMS;

    if (!allowedItems.includes(item)) {
      throw new BadRequestException(
        `Your ${basket.plan.toString().toLowerCase()} basket cannot recycle ${item.toLocaleLowerCase()}. Please upgrade to premium for more options.`,
      );
    }

    return await this.recycleModel.findOneAndUpdate(
      { _id: itemId, user: user._id },
      {
        basket,
        item,
        quantity,
      },
      { new: true },
    );
  }

  async retrieveUserRecycleItems(user: UserDocument, query: PaginationDto) {
    return await this.repositoryService.paginate({
      model: this.recycleModel,
      query,
      options: { user: user._id, isDeleted: { $ne: true } },
    });
  }

  async checkRecycleItemExist(userId: string, itemId: string) {
    const recycleItem = await this.recycleModel
      .exists({
        _id: itemId,
        user: userId,
        isDeleted: { $ne: true },
      })
      .populate('basket');

    if (!recycleItem) {
      throw new NotFoundException('this item has not been recycled');
    }
  }

  async findUserItems(userId: string) {
    const itemIds = await this.recycleModel
      .find({
        user: userId,
        isDeleted: { $ne: true },
      })
      .select('_id')
      .lean();

    return itemIds.map((item) => item._id);
  }

  async createRecycleHistory(userId: string) {
    const history = await this.recycleHistoryModel.create({
      user: userId,
    });

    return await history.populate([{ path: 'recycleItems' }]);
  }
}
