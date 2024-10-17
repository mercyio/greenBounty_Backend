import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRoleEnum } from '../../../../common/enums/user.enum';
import { RepositoryService } from '../../repository/repository.service';
import { GetUserPublicDto, AdminGetAllUsersDto } from '../dto/user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { BaseHelper } from 'src/common/utils/helper.util';
import { ENVIRONMENT } from 'src/common/configs/environment';
import { WorkspaceTypeEnum } from 'src/common/enums/workspace.enum';
import { UserService } from './user.service';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private repositoryService: RepositoryService,
    private userService: UserService,
  ) {}

  async createSuperAdmin(): Promise<UserDocument> {
    try {
      const email = ENVIRONMENT.ADMIN.EMAIL;
      const password = ENVIRONMENT.ADMIN.PASSWORD;
      const hashedPassword = await BaseHelper.hashData(password);

      const result = await this.userModel.create({
        email,
        password: hashedPassword,
        emailVerified: true,
        accountGenerated: true,
        workspace: WorkspaceTypeEnum.ENTERPRISE,
        role: UserRoleEnum.SUPER_ADMIN,
      });

      delete result['_doc'].password;
      return result;
    } catch (e) {
      throw new InternalServerErrorException(
        e.response?.message || 'Something went wrong',
      );
    }
  }

  async getUserDetails(query: GetUserPublicDto) {
    const { firstname, userId, email } = query;

    if (!firstname && !userId && !email) {
      throw new BadRequestException('Invalid query');
    }

    const user = await this.userModel.findOne({
      $or: [{ firstname }, { _id: userId }, { email }],
    });

    return user;
  }

  async getAllUsers(query: AdminGetAllUsersDto) {
    const { deactivated, company, ...paginationQuery } = query;

    return await this.repositoryService.paginate<UserDocument>({
      model: this.userModel,
      query: paginationQuery,
      options: {
        ...(deactivated && { deactivated }),
        ...(company && { company }),
      },
    });
  }
}
