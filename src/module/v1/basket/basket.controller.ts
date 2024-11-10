import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BasketService } from './basket.service';
import { SelectBasketDto } from './dto/basket.dto';
import { UserDocument } from '../user/schemas/user.schema';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { PaginationDto } from '../repository/dto/repository.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRoleEnum } from 'src/common/enums/user.enum';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  @ResponseMessage(RESPONSE_CONSTANT.BASKET.SELECT_BASKET_PLAN_SUCCESS)
  async selectBasket(
    @LoggedInUserDecorator() user: UserDocument,
    @Body() payload: SelectBasketDto,
  ) {
    return this.basketService.selectBasket(user, payload);
  }

  @Post('process-payment')
  @ResponseMessage(RESPONSE_CONSTANT.BASKET.PROCESS_BASKET_PAYMENT_SUCCESS)
  async upgradeToPremium(
    @LoggedInUserDecorator() user: UserDocument,
    amountPaid: number,
  ) {
    return this.basketService.upgradeToPremium(user._id.toString(), amountPaid);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN)
  @Get()
  async getAllBaskets(@Query() query: PaginationDto) {
    return await this.basketService.getAllBaskets(query);
  }
}
