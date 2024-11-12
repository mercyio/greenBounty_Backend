import {
  Body,
  Controller,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { AssignRecyclerDto } from '../dto/pickup.dto';
import { AdminPickupService } from '../services/admin-pickup.service';
import { IDQueryDto } from 'src/common/dto/query.dto';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';
import { NoCache } from 'src/common/decorators/cache.decorator';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRoleEnum } from 'src/common/enums/user.enum';
import { RolesGuard } from '../../auth/guards/role.guard';

@NoCache()
@UseGuards(RolesGuard)
@Roles(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN)
@Controller('admin/pickup')
export class AdminPickupController {
  constructor(private adminPickupService: AdminPickupService) {}

  @Patch()
  @ResponseMessage(RESPONSE_CONSTANT.PICKUP.ASSIGN_RECYCLER_SUCCESS)
  async assignRecycler(
    @Query() { _id }: IDQueryDto,
    @Body() payload: AssignRecyclerDto,
  ) {
    return await this.adminPickupService.assignRecycler(_id, payload);
  }

  @Post()
  async assignRecyclingPoint(@Query() { _id }: IDQueryDto) {
    return await this.adminPickupService.assignRecyclingPoint(_id);
  }

  // @Get()
  // async PickupRequest(@Query() query?: PaginationDto) {
  //   return await this.adminPickupService.getAllPickupRequestsStatus(query);
  // }
}
