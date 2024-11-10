import { Body, Controller, Post } from '@nestjs/common';
import { UserDocument } from '../user/schemas/user.schema';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { AddRecyclableDto } from './dto/recycle.dto';
import { AddRecyclableService } from './recycle.service';

@Controller('recycle')
export class AddRecyclableController {
  constructor(private readonly addRecyclableService: AddRecyclableService) {}

  @Post()
  async addRecycleables(
    @LoggedInUserDecorator() user: UserDocument,
    @Body() payload: AddRecyclableDto,
  ) {
    return this.addRecyclableService.addRecyclableToBasket(user, payload);
  }
}
