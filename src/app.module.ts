import { Module } from '@nestjs/common';
import { UserModule } from './module/v1/user/user.module';
import { DatabaseModule } from './module/v1/database/database.module';
import { AuthModule } from './module/v1/auth/auth.module';
import { RepositoryModule } from './module/v1/repository/repository.module';
import { MailModule } from './module/v1/mail/mail.module';
import { OtpModule } from './module/v1/otp/otp.module';
import { SettingsModule } from './module/v1/settings/settings.module';
import { WaitListModule } from './module/v1/waitList/waitList.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
