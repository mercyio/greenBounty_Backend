import { Body, Controller, Post } from '@nestjs/common';
import { PremiumBasketService } from './basket.service';
import { SelectBasketDto } from './dto/basket.dto';
import { UserDocument } from '../user/schemas/user.schema';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';
import { ResponseMessage } from 'src/common/decorators/response.decorator';

@Controller('basket')
export class PremiumController {
  constructor(private readonly premiumService: PremiumBasketService) {}

  @Post()
  @ResponseMessage(RESPONSE_CONSTANT.BASKET.SELECT_BASKET_PLAN_SUCCESS)
  async selectBasket(
    @LoggedInUserDecorator() user: UserDocument,
    @Body() payload: SelectBasketDto,
  ) {
    return this.premiumService.selectBasket(user, payload);
  }

  @Post('process-payment')
  @ResponseMessage(RESPONSE_CONSTANT.BASKET.PROCESS_BASKET_PAYMENT_SUCCESS)
  async upgradeToPremium(
    @LoggedInUserDecorator() user: UserDocument,
    amountPaid: number,
  ) {
    return this.premiumService.upgradeToPremium(
      user._id.toString(),
      amountPaid,
    );
  }
}
