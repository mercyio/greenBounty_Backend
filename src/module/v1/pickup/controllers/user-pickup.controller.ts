import { Body, Controller, Post } from '@nestjs/common';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { UserDocument } from '../../user/schemas/user.schema';
import { CreatePickupDto } from '../dto/pickup.dto';
import { UserPickupService } from '../services/user-pickup.service';

@Controller('user/pickup')
export class UserPickupController {
  constructor(private pickupService: UserPickupService) {}

  @Post()
  @ResponseMessage('Pickup request created successfully')
  async request(
    @LoggedInUserDecorator() user: UserDocument,
    @Body() payload: CreatePickupDto,
  ) {
    return await this.pickupService.request(user, payload);
  }
}
