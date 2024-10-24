import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepositoryService } from '../../repository/repository.service';
import { GetUserPublicDto, AdminGetAllUsersDto } from '../dto/user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { UserService } from './user.service';
import { ENVIRONMENT } from 'src/common/configs/environment';
import { CreateAdminDto } from '../dto/user-admin.dto';
import { UserRoleEnum } from 'src/common/enums/user.enum';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private repositoryService: RepositoryService,
    private userService: UserService,
  ) {}

  async createAdminUser(payload: CreateAdminDto) {
    const { email, password, fullName } = payload;

    if (
      email !== ENVIRONMENT.ADMIN.EMAIL ||
      password !== ENVIRONMENT.ADMIN.PASSWORD ||
      fullName !== ENVIRONMENT.ADMIN.PASSWORD
    ) {
      throw new BadRequestException('Invalid admin credentials');
    }

    const user = await this.userService.createUser(
      {
        email,
        password,
        confirmPassword: password,
        fullName,
      },
      UserRoleEnum.ADMIN,
    );

    return user;
  }

  async getUserDetails(query: GetUserPublicDto) {
    const { fullName, userId, email } = query;

    if (!fullName && !userId && !email) {
      throw new BadRequestException('Invalid query');
    }

    const user = await this.userModel.findOne({
      $or: [{ fullName }, { _id: userId }, { email }],
    });

    return user;
  }

  async getAllUsers(query: AdminGetAllUsersDto) {
    const { isDeleted, ...paginationQuery } = query;

    return await this.repositoryService.paginate<UserDocument>({
      model: this.userModel,
      query: paginationQuery,
      options: {
        ...(isDeleted && { isDeleted }),
      },
    });
  }
}
