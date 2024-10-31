import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { ClientSession, Model } from 'mongoose';
import {
  CreateUserDto,
  GoogleAuthDto,
  UpdateUserDto,
  UpgradeBasketDto,
} from '../dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BaseHelper } from '../../../../common/utils/helper.util';
import { UserRoleEnum } from 'src/common/enums/user.enum';
import { RepositoryService } from '../../repository/repository.service';
import { SettingsService } from '../../settings/settings.service';
import {
  ProfilePhotoHistory,
  ProfilePhotoHistoryDocument,
} from '../schemas/profile-photo-history.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private repositoryService: RepositoryService,
    private settingService: SettingsService,
    @InjectModel(ProfilePhotoHistory.name)
    private profilePhotoHistoryModel: Model<ProfilePhotoHistoryDocument>,
  ) {}

  async createUser(
    payload: CreateUserDto,
    role?: UserRoleEnum,
  ): Promise<UserDocument> {
    try {
      const { name, referralCode, password } = payload;
      delete payload.referralCode; // delete the referral code to prevent persisting this as the new user referral code

      let referralUserId: string | undefined;
      if (referralCode) {
        const referralUser = await this.userModel.findOne({ referralCode });

        if (!referralUser) {
          throw new BadRequestException('Referral code is invalid');
        }

        referralUserId = referralUser._id.toString();
      }

      // Validate the password
      BaseHelper.validatePassword(password);

      const hashedPassword = await BaseHelper.hashData(password);
      const userReferralCode = await BaseHelper.generateReferralCode(name);

      const result = await this.userModel.create({
        ...payload,
        password: hashedPassword,
        ...(role ? { role } : { role: UserRoleEnum.USER }),
        referredBy: referralUserId,
        referralCode: userReferralCode,
      });

      // update referral user referral count
      // TODO: award referral point
      if (referralUserId) {
        await this.userModel.updateOne(
          { _id: referralUserId },
          {
            $inc: {
              totalReferrals: 1,
            },
          },
        );
      }
      delete result['_doc'].password;
      return result;
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException(
          `${Object.keys(e.keyValue)} already exists`,
        );
      } else {
        throw new InternalServerErrorException(
          e.response?.message || 'Something went wrong',
        );
      }
    }
  }

  // async createAdminUser(email: string, password: string) {
  //   return await this.userModel.create(
  //     (email = ENVIRONMENT.ADMIN.EMAIL),
  //     (password = ENVIRONMENT.ADMIN.PASSWORD),
  //   );
  // }

  async getUserByEmailIncludePassword(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).select('+password');
  }

  async getUser(userId: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: userId });
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async findOneById(userId: string) {
    return this.userModel.findById({ _id: userId });
  }

  async updateUserByEmail(email: string, details: any) {
    return this.userModel.updateOne({ email }, details);
  }

  async updateUserById(userId: string, details: any) {
    await this.userModel.updateOne({ _id: userId }, details).exec();
  }

  async checkUserExistByEmail(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('No user exist with provided email');
    }

    return true;
  }

  async createUserFromGoogle(payload: GoogleAuthDto) {
    return await this.userModel.create({
      ...payload,
      emailVerified: true,
      isGoogleAuth: true,
      isLoggedOut: false,
    });
  }

  async updateUserPoint(
    user: UserDocument,
    point: number,
    type: 'inc' | 'dec',
    session?: ClientSession,
  ) {
    await this.userModel.updateOne(
      {
        _id: user._id,
      },
      {
        $inc: {
          wallet: type === 'inc' ? point : -point,
        },
      },
      {
        session,
      },
    );
  }

  // async showUserReferrals(user: UserDocument, query: PaginationDto) {
  //   return await this.repositoryService.paginate(this.userModel, query, {
  //     _id: { $ne: user._id },
  //     referredBy: user._id,
  //   });
  // }

  async chooseBasket(user: UserDocument, payload: UpgradeBasketDto) {
    const { plan } = payload;

    const existingUser = await this.userModel.findById(user);

    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    return await this.userModel.findOneAndUpdate(
      { _id: user },
      {
        $set: {
          basket: plan,
        },
      },
      {
        new: true,
      },
    );
  }

  async updateUser(
    userId: string,
    payload: UpdateUserDto,
    photo?: Express.Multer.File,
  ): Promise<UserDocument> {
    const { deleteProfilePhoto } = payload;

    const user = await this.userModel.findById(userId);

    let photoUrl = null;

    if ((photo && user?.profilePhoto) || deleteProfilePhoto) {
      await this.profilePhotoHistoryModel.create({
        user: userId,
        profilePhoto: user?.profilePhoto,
      });
    }

    if (photo) {
      const validImageMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

      if (!validImageMimeTypes.includes(photo.mimetype)) {
        throw new BadRequestException('Invalid image');
      }

      // const uploadRes = await uploadSingleFile(photo, 'profile-photos');
      // photoUrl = uploadRes?.url || null;

      // Just store the filename as URL for now
      photoUrl = photo.originalname;
    }

    const updateData = {
      ...payload,
    };

    if (photo && photoUrl) {
      updateData['profilePhoto'] = photoUrl;
    } else if (deleteProfilePhoto) {
      updateData['profilePhoto'] = null;
    }

    return this.userModel.findOneAndUpdate({ _id: userId }, updateData, {
      new: true,
    });
  }
}
