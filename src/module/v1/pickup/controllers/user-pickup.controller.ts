import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { UserDocument } from '../../user/schemas/user.schema';
import { CreatePickupDto } from '../dto/pickup.dto';
import { UserPickupService } from '../services/user-pickup.service';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';

@Controller('user/pickup')
export class UserPickupController {
  constructor(private pickupService: UserPickupService) {}

  @Post()
  @ResponseMessage(RESPONSE_CONSTANT.PICKUP.REQUEST_PICKUP_SUCCESS)
  async request(
    @LoggedInUserDecorator() user: UserDocument,
    @Body() payload: CreatePickupDto,
  ) {
    return await this.pickupService.request(user, payload);
  }

  @Get()
  async getUserPendingRequest(@LoggedInUserDecorator() user: UserDocument) {
    return await this.pickupService.getUserPendingRequest(user);
  }
}
