import { Injectable } from '@nestjs/common';
import { AddRecyclableDto } from './dto/recycle.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Basket, BasketDocument } from '../basket/schema/basket.schema';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class AddRecyclableService {
  constructor(
    @InjectModel(Basket.name)
    private basketModel: Model<BasketDocument>,
  ) {}

  async addRecyclableToBasket(user: UserDocument, payload: AddRecyclableDto) {
    const session = await this.basketModel.db.startSession();
    session.startTransaction();

    try {
      const { basketId, type, quantity } = payload;

      const basket = await this.basketModel.findById(basketId);
      console.log(basket._id);

      const updatedBasket = await this.basketModel.findByIdAndUpdate(
        basket._id,
        {
          $push: {
            // user: user._id,
            items: {
              type: type,
              quantity,
            },
          },
        },
        { new: true, session },
      );
      console.log(updatedBasket);

      await session.commitTransaction();
      return updatedBasket;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
