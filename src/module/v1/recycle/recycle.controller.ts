import { Body, Controller, Post } from '@nestjs/common';
import { UserDocument } from '../user/schemas/user.schema';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { AddRecyclableService } from './recycle.service';
import { AddRecyclableItemDto } from './dto/recycle.dto';

@Controller('recycle')
export class AddRecyclableController {
  constructor(private readonly addRecyclableService: AddRecyclableService) {}

  @Post()
  async addRecycleItem(
    @LoggedInUserDecorator() user: UserDocument,
    @Body() payload: AddRecyclableItemDto,
  ) {
    return this.addRecyclableService.addRecycleItem(user, payload);
  }
}
