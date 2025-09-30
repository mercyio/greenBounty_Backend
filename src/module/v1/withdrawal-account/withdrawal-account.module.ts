// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { WithdrawalAccountController } from './withdrawal-account.controller';
// import { WithdrawalAccountService } from './withdrawal-account.service';
// import {
//   WithdrawalAccount,
//   WithdrawalAccountSchema,
// } from './schema/withdrawal-account.schema';
// import { RepositoryModule } from '../repository/repository.module';

// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       { name: WithdrawalAccount.name, schema: WithdrawalAccountSchema },
//     ]),
//     RepositoryModule,
//   ],
//   controllers: [WithdrawalAccountController],
//   providers: [WithdrawalAccountService],
//   exports: [WithdrawalAccountService],
// })
// export class WithdrawalAccountModule {}
