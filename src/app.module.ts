import { Module } from '@nestjs/common';
import { UserModule } from './module/v1/user/user.module';
import { DatabaseModule } from './module/v1/database/database.module';
import { AuthModule } from './module/v1/auth/auth.module';
import { RepositoryModule } from './module/v1/repository/repository.module';
import { MailModule } from './module/v1/mail/mail.module';
import { OtpModule } from './module/v1/otp/otp.module';
import { SettingsModule } from './module/v1/settings/settings.module';
import { WaitListModule } from './module/v1/waitList/waitList.module';
import { PaymentModule } from './module/v1/payment/payment.module';
import { BasketModule } from './module/v1/basket/basket.module';
import { WithdrawalAccountModule } from './module/v1/withdrawal-account/withdrawal-account.module';
import { RecycleItemModule } from './module/v1/recycle/recycle.module';
import { PickupModule } from './module/v1/pickup/pickup.module';
import { WithdrawalModule } from './module/v1/withdrawal/withdrawal.module';
import { RewardChartModule } from './module/v1/reward-chart/reward-chart.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    AuthModule,
    OtpModule,
    MailModule,
    RepositoryModule,
    SettingsModule,
    WaitListModule,
    PaymentModule,
    BasketModule,
    WithdrawalAccountModule,
    RecycleItemModule,
    PickupModule,
    WithdrawalModule,
    RewardChartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
