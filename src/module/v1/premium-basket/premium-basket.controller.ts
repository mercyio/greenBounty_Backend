import { Body, Controller, Patch } from '@nestjs/common';
import { PremiumBasketService } from './premium-basket.service';
import { SelectBasketDto } from './dto/premium-basket.dto';
import { UserDocument } from '../user/schemas/user.schema';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';

@Controller('basket')
export class PremiumController {
  constructor(private readonly premiumService: PremiumBasketService) {}

  @Patch()
  async selectBasket(
    @Body() payload: SelectBasketDto,
    @LoggedInUserDecorator() user: UserDocument,
    // basketId: string,
    // amountPaid: number,
  ) {
    return this.premiumService.selectBasket(
      payload,
      user,
      // basketId,
      // amountPaid,
    );
  }
}
