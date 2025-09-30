// import { BadRequestException, Injectable } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { WaitList } from './schema/waitList.schema';
// import { InjectModel } from '@nestjs/mongoose';
// import { JoinWaitListDto } from './dto/waitList.dto';
// import { RepositoryService } from '../repository/repository.service';
// import { PaginationDto } from '../repository/dto/repository.dto';
// import { OtpService } from '../otp/otp.service';
// import { OtpTypeEnum } from 'src/common/enums/otp.enum';

// @Injectable()
// export class WaitListService {
//   constructor(
//     @InjectModel(WaitList.name) private waitListModel: Model<WaitList>,
//     private repositoryService: RepositoryService,
//     private otpService: OtpService,
//   ) {}

//   async joinWaitList(payload: JoinWaitListDto) {
//     const userJoinedAlready = await this.waitListModel.exists({
//       email: payload.email,
//     });

//     if (userJoinedAlready) {
//       throw new BadRequestException('You have already joined the waitList');
//     }

//     await this.otpService.sendOTP({
//       email: payload.email,
//       type: OtpTypeEnum.SUBSCRIBE_TO_WAITLIST,
//     });

//     return await this.waitListModel.create(payload);
//   }

//   async allEntries(query: PaginationDto) {
//     return this.repositoryService.paginate({
//       model: this.waitListModel,
//       query,
//     });
//   }
// }
