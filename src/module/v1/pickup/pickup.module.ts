import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Pickup, PickupSchema } from './schema/pickup.schema';
import { UserPickupController } from './controllers/user-pickup.controller';
import { UserPickupService } from './services/user-pickup.service';
import { RecycleItemModule } from '../recycle/recycle.module';
import { AdminPickupController } from './controllers/admin-pickup.controller';
import { AdminPickupService } from './services/admin-pickup.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pickup.name, schema: PickupSchema }]),
    RecycleItemModule,
  ],
  controllers: [UserPickupController, AdminPickupController],
  providers: [UserPickupService, AdminPickupService],
  exports: [UserPickupService, AdminPickupService],
})
export class PickupModule {}
