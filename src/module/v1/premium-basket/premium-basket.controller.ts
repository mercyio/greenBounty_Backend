import { Body, Controller, Post } from '@nestjs/common';
import { PremiumBasketService } from './premium-basket.service';
import { UpgradeToPremiumBasketDto } from './dto/premium-basket.dto';
import { UserDocument } from '../user/schemas/user.schema';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';

@Controller('premium-basket')
export class PremiumController {
  constructor(private readonly premiumService: PremiumBasketService) {}

  @Post()
  //   @UseGuards(AuthGuard)
  async upgradeToPremium(
    @Body() payload: UpgradeToPremiumBasketDto,
    @LoggedInUserDecorator() user: UserDocument,
  ) {
    return this.premiumService.upgrade(payload, user);
  }
}
