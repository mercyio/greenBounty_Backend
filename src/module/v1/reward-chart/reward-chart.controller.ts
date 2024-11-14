import { Controller, Get } from '@nestjs/common';
import { RewardChartService } from './reward-chart.service';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { UserDocument } from '../user/schemas/user.schema';

@Controller('reward/chart')
export class RewardChartController {
  constructor(private rewardChartService: RewardChartService) {}

  @Get()
  async getMonthlyRewards(@LoggedInUserDecorator() user: UserDocument) {
    return this.rewardChartService.getMonthlyRewards(user);
  }
}
