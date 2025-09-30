import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewardChart, RewardChartDocument } from './reward-chart.schema';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class RewardChartService {
  constructor(
    @InjectModel(RewardChart.name)
    private rewardChartModel: Model<RewardChartDocument>,
  ) {}

  // async getMonthlyRewards(user: UserDocument) {
  //   const rewards = await this.rewardChartModel.aggregate([
  //     { $match: { user: user._id.toString() } },
  //     {
  //       $group: {
  //         _id: {
  //           month: '$month',
  //           category: {
  //             $cond: [
  //               { $lt: ['$amount', 20] },
  //               'below $20',
  //               {
  //                 $cond: [
  //                   {
  //                     $and: [
  //                       { $gte: ['$amount', 20] },
  //                       { $lte: ['$amount', 50] },
  //                     ],
  //                   },
  //                   '$20-$50',
  //                   'above $50',
  //                 ],
  //               },
  //             ],
  //           },
  //         },
  //         totalAmount: { $sum: '$amount' },
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: '$_id.month',
  //         rewards: {
  //           $push: { category: '$_id.category', amount: '$totalAmount' },
  //         },
  //       },
  //     },
  //     { $sort: { _id: 1 } },
  //   ]);

  //   return rewards.map((item) => ({
  //     month: item._id,
  //     rewards: item.rewards,
  //   }));
  // }
}
