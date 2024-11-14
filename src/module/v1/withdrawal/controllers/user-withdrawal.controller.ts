import { Controller, Post, Body } from '@nestjs/common';

import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { UserDocument } from '../../user/schemas/user.schema';
import { CreateWithdrawalDto } from '../dto/withdrawal.dto';
import { UserWithdrawalService } from '../services/user-withdrawal.service';

@Controller('user/withdrawer')
export class UserWithdrawalController {
  constructor(private userWithdrawalService: UserWithdrawalService) {}

  @Post()
  async createWithdrawal(
    @LoggedInUserDecorator() user: UserDocument,
    @Body() payload: CreateWithdrawalDto,
    paymentDetails: any,
  ) {
    return this.userWithdrawalService.createWithdrawalRequest(
      user,
      payload,
      paymentDetails,
    );
  }

  //   @Get()
  //   async getWithdrawalById(@Query() { _id }: IDQueryDto) {
  //     return this.userWithdrawalService.getWithdrawalById(_id);
  //   }
}
