import { forwardRef, Module } from '@nestjs/common';
import { PremiumController } from './basket.controller';
import { PremiumBasketService } from './basket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModule } from '../payment/payment.module';
import { Basket, BasketSchema } from './schema/basket.schema';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { TransactionModule } from '../transaction/transaction.module';
import { Payment, PaymentSchema } from '../payment/schema/payment.schema';
import { RepositoryModule } from '../repository/repository.module';
import { User, UserSchema } from '../user/schemas/user.schema';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Basket.name, schema: BasketSchema },
      { name: Payment.name, schema: PaymentSchema },
      { name: User.name, schema: UserSchema },
    ]),
    forwardRef(() => PaymentModule),
    UserModule,
    MailModule,
    TransactionModule,
    RepositoryModule,
    SettingsModule,
  ],
  controllers: [PremiumController],
  providers: [PremiumBasketService], // Include any other providers you need
  exports: [PremiumBasketService],
})
export class PremiumModule {}
