import { Body, Controller, Post } from '@nestjs/common';
import { PremiumBasketService } from './premium-basket.service';
import { SelectBasketDto } from './dto/premium-basket.dto';
import { UserDocument } from '../user/schemas/user.schema';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';

@Controller('basket')
export class PremiumController {
  constructor(private readonly premiumService: PremiumBasketService) {}

  @Post()
  async selectBasket(
    @Body() payload: SelectBasketDto,
    @LoggedInUserDecorator() user: UserDocument,
  ) {
    return this.premiumService.selectBasket(payload, user);
  }
}
