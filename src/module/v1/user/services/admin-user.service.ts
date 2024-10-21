import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepositoryService } from '../../repository/repository.service';
import { GetUserPublicDto, AdminGetAllUsersDto } from '../dto/user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { UserService } from './user.service';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private repositoryService: RepositoryService,
    private userService: UserService,
  ) {}

  async getUserDetails(query: GetUserPublicDto) {
    const { username, userId, email } = query;

    if (!username && !userId && !email) {
      throw new BadRequestException('Invalid query');
    }

    const user = await this.userModel.findOne({
      $or: [{ username }, { _id: userId }, { email }],
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
