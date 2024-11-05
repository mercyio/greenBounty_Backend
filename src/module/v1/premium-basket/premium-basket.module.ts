import { forwardRef, Module } from '@nestjs/common';
import { PremiumController } from './premium-basket.controller';
import { PremiumBasketService } from './premium-basket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModule } from '../payment/payment.module';
import {
  PremiumBasket,
  PremiumBasketSchema,
} from './schema/premium-basket.schema';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { TransactionModule } from '../transaction/transaction.module';
import { Payment, PaymentSchema } from '../payment/schema/payment.schema';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PremiumBasket.name, schema: PremiumBasketSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
    forwardRef(() => PaymentModule),
    UserModule,
    MailModule,
    TransactionModule,
    RepositoryModule,
  ],
  controllers: [PremiumController],
  providers: [PremiumBasketService], // Include any other providers you need
  exports: [PremiumBasketService],
})
export class PremiumModule {}
