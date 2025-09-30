// import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
// import { WaitListService } from './waitList.service';
// import { Public } from '../../../common/decorators/public.decorator';
// import { ResponseMessage } from '../../../common/decorators/response.decorator';
// import { RESPONSE_CONSTANT } from '../../../common/constants/response.constant';
// import { PaginationDto } from '../repository/dto/repository.dto';
// import { Roles } from '../../../common/decorators/role.decorator';
// import { UserRoleEnum } from '../../../common/enums/user.enum';
// import { RolesGuard } from '../auth/guards/role.guard';
// import { JoinWaitListDto } from './dto/waitList.dto';

// @Controller('waitList')
// export class WaitListController {
//   constructor(private readonly waitListService: WaitListService) {}

//   @Public()
//   @ResponseMessage(RESPONSE_CONSTANT.WAITLIST.JOIN_WAITLIST_SUCCESS)
//   @Post()
//   joinWaitList(@Body() payload: JoinWaitListDto) {
//     return this.waitListService.joinWaitList(payload);
//   }

//   @UseGuards(RolesGuard)
//   @Roles(UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN)
//   @Get()
//   allEntries(@Query() query: PaginationDto) {
//     return this.waitListService.allEntries(query);
//   }
// }
