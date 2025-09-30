// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserModule } from '../user/user.module';
// import { TransactionModule } from '../transaction/transaction.module';
// import { MailModule } from '../mail/mail.module';
// import { WithdrawalAccountModule } from '../withdrawal-account/withdrawal-account.module';
// import { UserWithdrawalController } from './controllers/user-withdrawal.controller';
// import { UserWithdrawalService } from './services/user-withdrawal.service';
// import { RepositoryModule } from '../repository/repository.module';
// import { AdminWithdrawalController } from './controllers/admin-withdrawal.controller';
// import { AdminWithdrawalService } from './services/admin-withdrawal.service';
// import {
//   Transaction,
//   TransactionSchema,
// } from '../transaction/schemas/transaction.schema';

// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       { name: Transaction.name, schema: TransactionSchema },
//     ]),
//     UserModule,
//     TransactionModule,
//     MailModule,
//     WithdrawalAccountModule,
//     RepositoryModule,
//   ],
//   controllers: [UserWithdrawalController, AdminWithdrawalController],
//   providers: [UserWithdrawalService, AdminWithdrawalService],
//   exports: [UserWithdrawalService, AdminWithdrawalService],
// })
// export class WithdrawalModule {}
