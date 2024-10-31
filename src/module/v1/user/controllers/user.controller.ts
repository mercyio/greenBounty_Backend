/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ILoggedInUser, LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';
import { UpdateUserDto, UpgradeBasketDto } from '../dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ResponseMessage(RESPONSE_CONSTANT.USER.GET_CURRENT_USER_SUCCESS)
  @Get('/')
  async getCurrentUser(@LoggedInUserDecorator() user: any) {
    return await this.userService.getUser(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('basket')
  async chooseBasket(
    @LoggedInUserDecorator() user: any,
    @Body() payload: UpgradeBasketDto,
  ) {
    return await this.userService.chooseBasket(user.id, payload);
  }

  @ResponseMessage(RESPONSE_CONSTANT.USER.UPDATE_USER_PROFILE_SUCCESS)
  @UseInterceptors(FileInterceptor('photo'))
  @Patch('/profile')
  async updateProfile(
    @Body() payload: UpdateUserDto,
    @LoggedInUserDecorator() user: ILoggedInUser,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    return await this.userService.updateUser(user._id, payload, photo);
  }
}
