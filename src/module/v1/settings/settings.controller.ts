import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from 'src/module/v1/auth/guards/jwt.guard';
import { RolesGuard } from 'src/module/v1/auth/guards/role.guard';
import { ISettings } from 'src/common/interfaces/setting.interface';
import {
  ILoggedInUser,
  LoggedInUserDecorator,
} from 'src/common/decorators/logged_in_user.decorator';
import { UserRoleEnum } from 'src/common/enums/user.enum';
import { Roles } from 'src/common/decorators/role.decorator';

@Controller('settings')
export class SettingsController implements OnModuleInit {
  constructor(private readonly settingsService: SettingsService) {}

  onModuleInit() {
    this.settingsService.loadSettings();
  }

  @Get()
  async getSettings() {
    return await this.settingsService.getSettings();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Patch()
  async updateSettings(
    @Body() payload: ISettings,
    @LoggedInUserDecorator() user: ILoggedInUser,
  ) {
    return await this.settingsService.updateSettings(user?._id, payload);
  }
}
