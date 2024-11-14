import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../../user/services/user.service';
import { TransactionStatusEnum } from 'src/common/enums/transaction.enum';
import { RepositoryService } from '../../repository/repository.service';
import { TransactionService } from '../../transaction/transaction.service';
import { MailService } from '../../mail/mail.service';
import {
  Transaction,
  TransactionDocument,
} from '../../transaction/schemas/transaction.schema';
import { Model } from 'mongoose';
import { UserDocument } from '../../user/schemas/user.schema';

@Injectable()
export class AdminWithdrawalService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private userService: UserService,
    private repositoryService: RepositoryService,
    private transactionService: TransactionService,
    private mailService: MailService,
  ) {}

  async markWithdrawalAsSuccessful(admin: UserDocument, reference: string) {
    const session = await this.transactionModel.db.startSession();
    session.startTransaction();
    let sessionCommitted = false;

    try {
      const transaction =
        await this.transactionService.getTransactionByReference(reference);
      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      const user = await this.userService.findOneById(
        transaction.user._id.toString(),
      );
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (transaction.status !== TransactionStatusEnum.Pending) {
        throw new BadRequestException('Transaction is not in pending state');
      }

      if (user.wallet < transaction.totalAmount) {
        throw new BadRequestException('Insufficient balance');
      }

      await Promise.all([
        this.userService.updateUserById(user._id.toString(), {
          $inc: { wallet: -transaction.totalAmount * 10 },
        }),
        this.transactionService.updateSingleQuery(
          { reference: reference },
          {
            status: TransactionStatusEnum.Completed,
            approvedBy: admin._id.toString(),
            approvedAt: new Date(),
            description: transaction.description,
            totalAmount: transaction.totalAmount,
          },
          session,
        ),
      ]);

      await session.commitTransaction();
      sessionCommitted = true;

      this.mailService
        .sendEmail(
          user.email,
          'Withdrawal Successful',
          `Your withdrawal of ${transaction.totalAmount} has been processed successfully`,
        )
        .catch(console.error);

      // Fetch the updated transaction with populated user
      return await this.transactionModel
        .findOne({ reference })
        .populate('user');
    } catch (error) {
      if (!sessionCommitted) {
        await session.abortTransaction();
      }
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
