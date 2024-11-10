import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AddRecyclableController } from './recycle.controller';
import { AddRecyclableService } from './recycle.service';
import { BasketModule } from '../basket/basket.module';
import { Recycle, RecycleSchema } from './schema/recycle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recycle.name, schema: RecycleSchema }]),
    BasketModule,
  ],
  controllers: [AddRecyclableController],
  providers: [AddRecyclableService],

  exports: [AddRecyclableService],
})
export class AddRecyclableModule {}
