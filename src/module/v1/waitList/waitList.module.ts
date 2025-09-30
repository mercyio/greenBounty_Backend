// import { Module } from '@nestjs/common';
// import { WaitListService } from './waitList.service';
// import { WaitListController } from './waitList.controller';
// import { WaitList, WaitListSchema } from './schema/waitList.schema';
// import { MongooseModule } from '@nestjs/mongoose';
// import { RepositoryModule } from '../repository/repository.module';
// import { OtpModule } from '../otp/otp.module';

// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       { name: WaitList.name, schema: WaitListSchema },
//     ]),
//     RepositoryModule,
//     OtpModule,
//   ],
//   controllers: [WaitListController],
//   providers: [WaitListService],
// })
// export class WaitListModule {}
