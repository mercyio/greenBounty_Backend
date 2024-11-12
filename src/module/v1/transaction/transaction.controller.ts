import { Controller, Get, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { UserDocument } from '../user/schemas/user.schema';
import { GetUserTransactionsDto } from './dto/transaction.dto';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { IDQueryDto } from 'src/common/dto/query.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('all')
  async userTransactions(
    @LoggedInUserDecorator() user: UserDocument,
    @Query() query: GetUserTransactionsDto,
  ) {
    return this.transactionService.userTransactions(user, query);
  }

  @Get()
  async getTransactionByReference(@Query() { _id }: IDQueryDto) {
    return this.transactionService.getTransactionByReference(_id);
  }
}
