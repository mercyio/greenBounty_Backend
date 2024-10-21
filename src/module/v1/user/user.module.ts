import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { RepositoryModule } from '../repository/repository.module';
import { AdminUserController } from './controllers/admin-user.controller';
import { AdminUserService } from './services/admin-user.service';
import { SettingsModule } from '../settings/settings.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RepositoryModule,
    SettingsModule,
  ],
  controllers: [UserController, AdminUserController],
  providers: [UserService, AdminUserService],
  exports: [UserService, AdminUserService],
})
export class UserModule {}
