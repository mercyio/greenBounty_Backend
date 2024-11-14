import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  WithdrawalAccount,
  WithdrawalAccountDocument,
} from './schema/withdrawal-account.schema';
import {
  CreateWithdrawalAccountDto,
  UpdateWithdrawalAccountDto,
} from './dto/withdrawal-account.dto';
import { UserDocument } from '../user/schemas/user.schema';
import { PaginationDto } from '../repository/dto/repository.dto';
import { RepositoryService } from '../repository/repository.service';
import { BaseRepositoryService } from '../repository/base.service';

@Injectable()
export class WithdrawalAccountService extends BaseRepositoryService<WithdrawalAccountDocument> {
  constructor(
    @InjectModel(WithdrawalAccount.name)
    private withdrawalAccountModel: Model<WithdrawalAccountDocument>,
    private repositoryService: RepositoryService,
  ) {
    super(withdrawalAccountModel);
  }

  async create(user: UserDocument, payload: CreateWithdrawalAccountDto) {
    const { accountNumber, bankName } = payload;

    await this.checkAccountDetailsExists(accountNumber, bankName);

    return await this.withdrawalAccountModel.create({
      user: user._id,
      ...payload,
    });
  }

  async update(user: UserDocument, payload: UpdateWithdrawalAccountDto) {
    const { _id, accountNumber, bankName } = payload;

    const accountExist = await this.withdrawalAccountModel.findOne({
      _id,
      user: user._id,
    });

    if (!accountExist) {
      throw new NotFoundException(
        'Sorry the record you are trying to edit does not exist',
      );
    }

    const newAccountNumber = accountNumber ?? accountExist.accountNumber;
    const newBankName = bankName ?? accountExist.bankName;

    if (accountNumber || bankName) {
      await this.checkAccountDetailsExists(newAccountNumber, newBankName, _id);
    }

    return await this.withdrawalAccountModel.findOneAndUpdate(
      {
        _id,
        user: user._id,
      },
      payload,
      {
        new: true,
        upsert: false,
      },
    );
  }

  async retrieve(user: UserDocument, query: PaginationDto) {
    return await this.repositoryService.paginate({
      model: this.withdrawalAccountModel,
      query,
      options: { user: user._id, isDeleted: { $ne: true } },
    });
  }

  async checkAccountDetailsExists(
    accountNumber: string,
    bankName: string,
    _id?: string,
  ) {
    const details = await this.withdrawalAccountModel.exists({
      accountNumber,
      bankName,
      ...(_id ? { _id: { $ne: _id } } : {}),
      isDeleted: { $ne: true },
    });

    if (details) {
      throw new ConflictException(
        `You already have an account details with Bank name ${bankName} and Account Number ${accountNumber}`,
      );
    }
  }

  async getWithdrawalAccountById(
    withdrawalAccountId: string,
    userId: string,
  ): Promise<WithdrawalAccountDocument | null> {
    return this.withdrawalAccountModel.findOne({
      user: userId,
      _id: withdrawalAccountId,
    });
  }
}
