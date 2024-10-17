import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRoleEnum } from '../../../../common/enums/user.enum';
import { PaginationDto } from '../../repository/dto/repository.dto';
import { RepositoryService } from '../../repository/repository.service';

import { GetUserPublicDto, AdminGetAllUsersDto } from '../dto/user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { ActivateDeactivateAdminDto } from '../dto/user-admin.dto';
import { ILoggedInUser } from 'src/common/decorators/logged_in_user.decorator';
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

  async getAllAdmins(query: PaginationDto) {
    const { searchQuery } = query;

    let search = {};
    if (searchQuery) {
      search = {
        $or: [
          { firstName: { $regex: searchQuery, $options: 'i' } },
          { lastName: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
        ],
      };
    }

    const [stats, result] = await Promise.all([
      this.userModel.aggregate([
        {
          $match: {
            role: { $in: [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN] },
          },
        },
        {
          $group: {
            _id: '$role',
            total: { $sum: 1 },
          },
        },
      ]),
      this.repositoryService.paginate<UserDocument>({
        model: this.userModel,
        query,
        options: {
          role: { $in: [UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN] },
          ...search,
        },
      }),
    ]);

    return {
      stats,
      data: result,
    };
  }

  // TODO deactivate/activate workspace
  async activateDeactivateAdmin(
    admin: ILoggedInUser,
    payload: ActivateDeactivateAdminDto,
  ) {
    const { adminToUpdateId, isActive } = payload;

    if (admin._id.toString() === adminToUpdateId.toString()) {
      throw new BadRequestException('You cannot deactivate yourself');
    }

    const response = await this.userModel.findByIdAndUpdate(
      adminToUpdateId,
      { deactivated: !isActive },
      {
        new: true,
      },
    );

    return response;
  }

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
