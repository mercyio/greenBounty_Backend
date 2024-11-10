import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserDocument } from '../user/schemas/user.schema';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { RecycleItemDto } from './dto/recycle.dto';
import { IDQueryDto } from 'src/common/dto/query.dto';
import { PaginationDto } from '../repository/dto/repository.dto';
import { RecycleItemService } from './recycle.service';

@Controller('recycle')
export class RecycleItemController {
  constructor(private readonly recycleItemService: RecycleItemService) {}

  @Post()
  async add(
    @LoggedInUserDecorator() user: UserDocument,
    @Body() payload: RecycleItemDto,
  ) {
    return this.recycleItemService.add(user, payload);
  }

  @Patch()
  async update(
    @LoggedInUserDecorator() user: UserDocument,
    @Query() { _id }: IDQueryDto,
    @Body() payload: RecycleItemDto,
  ) {
    return await this.recycleItemService.update(user, _id, payload);
  }

  @Get()
  async retrieve(
    @LoggedInUserDecorator() user: UserDocument,
    @Query() query: PaginationDto,
  ) {
    return await this.recycleItemService.retrieveUserRecycleItems(user, query);
  }

  @Delete()
  async delete(@Query() { _id }: IDQueryDto) {
    return await this.recycleItemService.softDelete(_id);
  }
}
