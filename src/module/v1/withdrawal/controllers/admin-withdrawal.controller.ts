import { Controller, Post, UseGuards, Query } from '@nestjs/common';
import { UserRoleEnum } from 'src/common/enums/user.enum';
import { RolesGuard } from '../../auth/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { AdminWithdrawalService } from '../services/admin-withdrawal.service';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { UserDocument } from '../../user/schemas/user.schema';

@Controller('admin/withdrawer')
@UseGuards(RolesGuard)
@Roles(UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN)
export class AdminWithdrawalController {
  constructor(private adminWithdrawalService: AdminWithdrawalService) {}

  //   @Post()
  //   async markWithdrawalAsSuccessful(
  //     @LoggedInUserDecorator() admin: UserDocument,
  //     @Query('reference') reference: string,
  //   ) {
  //     return this.adminWithdrawalService.markWithdrawalAsSuccessful(
  //       admin,
  //       reference,
  //     );
  //   }
}
