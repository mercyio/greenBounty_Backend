import { Controller, Post, Get, Body, Query, Patch } from '@nestjs/common';
import { WaitListService } from './waitList.service';
import { AddToWaitListDto, GetAllWaitListDto } from './dto/waitList.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';
import { ResponseMessage } from 'src/common/decorators/response.decorator';

@Controller('waitList')
export class WaitListController {
  constructor(private readonly waitListService: WaitListService) {}

  @Public()
  @ResponseMessage(RESPONSE_CONSTANT.SUBSCRIBE_EMAIL_SUCCESS)
  @Post('subscribe')
  async addToWaitList(@Body() payload: AddToWaitListDto) {
    return this.waitListService.addToWaitList(payload);
  }

  @Get('/')
  async getWaitList(@Query() query: GetAllWaitListDto) {
    return this.waitListService.getAllWaitList(query);
  }

  @Public()
  @ResponseMessage(RESPONSE_CONSTANT.UNSUBSCRIBE_EMAIL_SUCCESS)
  @Patch('unsubscribe')
  async removeFromWaitList(@Body('email') email: string): Promise<any> {
    return this.waitListService.removeFromWaitList(email);
  }
}
