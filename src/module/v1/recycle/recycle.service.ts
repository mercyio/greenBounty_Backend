import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddRecyclableItemDto } from './dto/recycle.dto';
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

@Injectable()
export class AddRecyclableService {
  constructor(
    @InjectModel(Recycle.name)
    private recycleModel: Model<RecycleDocument>,
    private basketService: BasketService,
  ) {}

  async addRecycleItem(user: UserDocument, payload: AddRecyclableItemDto) {
    const basket = await this.basketService.getUserBasket(user._id.toString());

    if (!basket) {
      throw new NotFoundException(' select a basket first before proceeding');
    }

    const allowedItems =
      user.basket === BasketTypeEnum.PREMIUM
        ? PREMIUM_ALLOWED_ITEMS
        : STANDARD_ALLOWED_ITEMS;

    if (!allowedItems.includes(payload.item)) {
      throw new BadRequestException(
        `Your ${user.basket.toString().toLowerCase()} basket cannot recycle ${payload.item}. Please upgrade to premium for more options.`,
      );
    }

    return await this.recycleModel.create({
      basket: payload.basketId,
      item: payload.item,
      quantity: payload.quantity,
      user: user._id,
    });
  }
}
