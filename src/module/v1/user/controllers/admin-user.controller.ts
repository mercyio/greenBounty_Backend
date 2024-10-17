import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserRoleEnum } from '../../../../common/enums/user.enum';
import { Roles } from '../../../../common/decorators/role.decorator';
import { AdminUserService } from '../services/admin-user.service';
import { RolesGuard } from '../../auth/guards/role.guard';
import { AdminGetAllUsersDto, GetUserPublicDto } from '../dto/user.dto';
import { NoCache } from 'src/common/decorators/cache.decorator';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';
import { Public } from 'src/common/decorators/public.decorator';
import { ResponseMessage } from 'src/common/decorators/response.decorator';

@NoCache()
@UseGuards(RolesGuard)
@Roles(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN)
@Controller('user/admin')
export class AdminUserController {
  constructor(private adminUserService: AdminUserService) {}

  @Get('user-details')
  async getUserDetails(@Query() query: GetUserPublicDto) {
    return await this.adminUserService.getUserDetails(query);
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.REGISTER_SUCCESS)
  @Public()
  @Post('create-super-admin')
  async createSuperAdmin() {
    return await this.adminUserService.createSuperAdmin();
  }

  @ResponseMessage(RESPONSE_CONSTANT.AUTH.REGISTER_SUCCESS)
  @Get('all-users')
  async getAllUsers(@Query() query: AdminGetAllUsersDto) {
    return await this.adminUserService.getAllUsers(query);
  }
}
