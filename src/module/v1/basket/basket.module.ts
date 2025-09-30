// import { forwardRef, Module } from '@nestjs/common';
// import { BasketController as BasketController } from './basket.controller';
// import { BasketService } from './basket.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { PaymentModule } from '../payment/payment.module';
// import { Basket, BasketSchema } from './schema/basket.schema';
// import { UserModule } from '../user/user.module';
// import { MailModule } from '../mail/mail.module';
// import { TransactionModule } from '../transaction/transaction.module';
// import { RepositoryModule } from '../repository/repository.module';
// import { SettingsModule } from '../settings/settings.module';

// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       { name: Basket.name, schema: BasketSchema },
//       // { name: Payment.name, schema: PaymentSchema },
//     ]),
//     forwardRef(() => PaymentModule),
//     UserModule,
//     MailModule,
//     TransactionModule,
//     RepositoryModule,
//     SettingsModule,
//   ],
//   controllers: [BasketController],
//   providers: [BasketService],
//   exports: [BasketService],
// })
// export class BasketModule {}
