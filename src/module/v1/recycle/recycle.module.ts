// import { MongooseModule } from '@nestjs/mongoose';
// import { Module } from '@nestjs/common';
// import { RecycleItemController } from './recycle.controller';
// import { RecycleItemService } from './recycle.service';
// import { BasketModule } from '../basket/basket.module';
// import { Recycle, RecycleSchema } from './schema/recycle.schema';
// import { RepositoryModule } from '../repository/repository.module';
// import {
//   RecycleHistory,
//   RecycleHistorySchema,
// } from './schema/recycle-hystory.schema';

// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       { name: Recycle.name, schema: RecycleSchema },
//       { name: RecycleHistory.name, schema: RecycleHistorySchema },
//     ]),
//     BasketModule,
//     RepositoryModule,
//   ],
//   controllers: [RecycleItemController],
//   providers: [RecycleItemService],

//   exports: [RecycleItemService],
// })
// export class RecycleItemModule {}
