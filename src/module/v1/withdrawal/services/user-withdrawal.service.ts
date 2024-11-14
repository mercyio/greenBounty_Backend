import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import {
  TransactionStatusEnum,
  TransactionTypeEnum,
} from 'src/common/enums/transaction.enum';
import { RepositoryService } from '../../repository/repository.service';
import { UserDocument } from '../../user/schemas/user.schema';
import { CreateWithdrawalDto } from '../dto/withdrawal.dto';
import { TransactionService } from '../../transaction/transaction.service';
import { MailService } from '../../mail/mail.service';
import { WithdrawalAccountService } from '../../withdrawal-account/withdrawal-account.service';

@Injectable()
export class UserWithdrawalService {
  constructor(
    private userService: UserService,
    private repositoryService: RepositoryService,
    private transactionService: TransactionService,
    private mailService: MailService,
    private withdrawalAccountService: WithdrawalAccountService,
  ) {}

  async createWithdrawalRequest(
    user: UserDocument,
    payload: CreateWithdrawalDto,
    paymentDetails: any,
  ) {
    const { account, amount, description } = payload;
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.wallet < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    const [withdrawalAccount, existingTransaction] = await Promise.all([
      this.withdrawalAccountService.getWithdrawalAccountById(
        account,
        user._id.toString(),
      ),
      this.transactionService.findOneQuery({
        options: { account },
      }),
    ]);

    if (!withdrawalAccount) {
      throw new BadRequestException('Withdrawal account not found');
    }

    // if transaction is completed or failed, do nothing
    if (
      existingTransaction &&
      [TransactionStatusEnum.Completed, TransactionStatusEnum.Failed].includes(
        existingTransaction.status,
      )
    ) {
      return;
    }

    const transaction = await this.transactionService.create({
      user: user._id.toString(),
      withdrawalAccount: account,
      status: TransactionStatusEnum.Pending,
      totalAmount: amount,
      description: description,
      type: TransactionTypeEnum.Withdrawal,
      paymentMethod: 'bank_transfer',
      metadata: {
        ...paymentDetails,
        withdrawalAccount,
      },
      settlement: 0,
      // paymentMethod: paymentDetails.paymentMethod,
    });

    if (!transaction) return;

    await this.mailService.sendEmail(
      'admin@greenbounty.com',
      'New Withdrawal Request',
      `User ${user.email} has requested a withdrawal of ${amount} to account ${withdrawalAccount.accountNumber}`,
    );

    return transaction;
  }
  // async getWithdrawalById(withdrawalId: string) {
  //   return this.withdrawalModel.findById(withdrawalId);
  // }

  // async userWithdrawals(user: UserDocument, query: GetUserWithdrawalDto) {
  //   const { type, status, ...paginationQuery } = query;

  //   const filterQuery: FilterQuery<WithdrawalDocument> = {
  //     user: user._id,
  //   };

  //   if (type) {
  //     filterQuery.type = type;
  //   }

  //   if (status) {
  //     filterQuery.status = status;
  //   }

  //   return this.repositoryService.paginate({
  //     model: this.withdrawalModel,
  //     query: paginationQuery,
  //     options: filterQuery,
  //   });
}

//   async updateWithdrawalStatus(
//     id: string,
//     status: WithdrawalStatusEnum,
//     rejectionReason?: string,
//   ) {
//     const withdrawal = await this.withdrawalModel.findById(id);

//     if (!withdrawal) {
//       throw new BadRequestException('Withdrawal not found');
//     }

//     if (status === WithdrawalStatusEnum.Rejected) {
//       // Refund user wallet if rejected
//       await this.userService.updateWallet(
//         withdrawal.user.toString(),
//         withdrawal.amount,
//       );
//     }

//     return this.withdrawalModel.findByIdAndUpdate(
//       id,
//       { status, ...(rejectionReason && { rejectionReason }) },
//       { new: true },
//     );
//   }
