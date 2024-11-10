import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Basket, BasketSchema } from '../basket/schema/basket.schema';
import { AddRecyclableController } from './recycle.controller';
import { AddRecyclableService } from './recycle.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Basket.name, schema: BasketSchema }]),
  ],
  controllers: [AddRecyclableController],
  providers: [AddRecyclableService],

  exports: [AddRecyclableService],
})
export class AddRecyclableModule {}
