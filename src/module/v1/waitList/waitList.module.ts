import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepositoryModule } from '../repository/repository.module';
import { OtpModule } from '../otp/otp.module';
import { WaitList, WaitListSchema } from './schema/waitList.schema';
import { WaitListController } from './waitList.controller';
import { WaitListService } from './waitList.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WaitList.name, schema: WaitListSchema },
    ]),
    RepositoryModule,
    OtpModule,
  ],
  controllers: [WaitListController],
  providers: [WaitListService],
  exports: [WaitListService],
})
export class WaitListModule {}
