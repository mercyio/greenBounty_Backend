import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WaitList, WaitListDocument } from './schema/waitList.schema';
import { AddToWaitListDto, GetAllWaitListDto } from './dto/waitList.dto';
import { OtpTypeEnum } from 'src/common/enums/otp.enum';
import { OtpService } from '../otp/otp.service';
import { RepositoryService } from '../repository/repository.service';

@Injectable()
export class WaitListService {
  constructor(
    @InjectModel(WaitList.name)
    private waitListModel: Model<WaitListDocument>,
    private otpService: OtpService,
    private repositoryService: RepositoryService,
  ) {}

  async addToWaitList(payload: AddToWaitListDto) {
    const { email } = payload;

    const user = await this.waitListModel.findOne({ email });

    if (!user) {
      const newUser = await this.waitListModel.create(payload);

      await this.otpService.sendOTP({
        email: newUser.email,
        type: OtpTypeEnum.SUBSCRIBE_EMAIL,
      });

      return;
    }

    await this.waitListModel.findOneAndUpdate(
      { email },
      { isDeleted: false },
      { new: true },
    );
  }

  async getAllWaitList(query: GetAllWaitListDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isDeleted, ...paginationQuery } = query;

    return await this.repositoryService.paginate<WaitListDocument>({
      model: this.waitListModel,
      query: paginationQuery,
      options: {
        isDeleted: false,
      },
    });
  }

  async removeFromWaitList(email: string): Promise<any> {
    const user = await this.waitListModel.exists({ email });

    console.log(user);

    if (!user) {
      throw new NotFoundException('You are not a subscriber');
    }

    return await this.waitListModel.findOneAndUpdate(
      { email },
      { isDeleted: true },
      { new: true, upsert: false },
    );
  }
}
