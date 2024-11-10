import { Body, Controller, Post, Query } from '@nestjs/common';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { AssignRecyclerDto } from '../dto/pickup.dto';
import { AdminPickupService } from '../services/admin-pickup.service';
import { IDQueryDto } from 'src/common/dto/query.dto';

@Controller('admin/pickup')
export class AdminPickupController {
  constructor(private adminPickupService: AdminPickupService) {}

  @Post()
  @ResponseMessage('Pickup request created successfully')
  async assignRecycler(
    @Query() { _id }: IDQueryDto,
    @Body() payload: AssignRecyclerDto,
  ) {
    return await this.adminPickupService.assignRecycler(_id, payload);
  }
}
