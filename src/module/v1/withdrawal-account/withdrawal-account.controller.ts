import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { WithdrawalAccountService } from './withdrawal-account.service';
import { PaginationDto } from '../repository/dto/repository.dto';
import { UserDocument } from '../user/schemas/user.schema';
import { NoCache } from 'src/common/decorators/cache.decorator';
import {
  CreateWithdrawalAccountDto,
  UpdateWithdrawalAccountDto,
} from './dto/withdrawal-account.dto';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { IDQueryDto } from 'src/common/dto/query.dto';

@NoCache()
@Controller('user/withdrawer-account')
export class WithdrawalAccountController {
  constructor(
    private readonly withdrawalAccountService: WithdrawalAccountService,
  ) {}

  //   @Post()
  //   async create(
  //     @LoggedInUserDecorator() user: UserDocument,
  //     @Body() payload: CreateWithdrawalAccountDto,
  //   ) {
  //     return await this.withdrawalAccountService.create(user, payload);
  //   }

  //   @Patch()
  //   async update(
  //     @LoggedInUserDecorator() user: UserDocument,
  //     @Body() payload: UpdateWithdrawalAccountDto,
  //   ) {
  //     return await this.withdrawalAccountService.update(user, payload);
  //   }

  //   @Get()
  //   async retrieve(
  //     @LoggedInUserDecorator() user: UserDocument,
  //     @Query() query: PaginationDto,
  //   ) {
  //     return await this.withdrawalAccountService.retrieve(user, query);
  //   }

  //   @Delete()
  //   async delete(@Query() { _id }: IDQueryDto) {
  //     return await this.withdrawalAccountService.softDelete(_id);
  //   }
}
