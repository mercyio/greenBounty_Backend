// import {
//   BadRequestException,
//   forwardRef,
//   Inject,
//   Injectable,
//   NotFoundException,
//   UnprocessableEntityException,
// } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { UserService } from '../user/services/user.service';
// import { Model } from 'mongoose';
// import {
//   TransactionStatusEnum,
//   TransactionTypeEnum,
// } from 'src/common/enums/transaction.enum';
// import { BaseRepositoryService } from '../repository/base.service';
// import { TransactionService } from '../transaction/transaction.service';
// import { MailService } from '../mail/mail.service';
// import { premiumBasketNotificationEmailTemplate } from '../mail/templates/premium-success.email';
// import { Basket, BasketDocument } from './schema/basket.schema';
// import { BasketTypeEnum } from 'src/common/enums/basket.enum';
// import { PaymentProvidersEnum } from 'src/common/enums/payment.enum';
// import {
//   IBaseInitializePayment,
//   IFlutterwaveInitializePayment,
// } from 'src/common/interfaces/payment.interface';
// import { UserDocument } from '../user/schemas/user.schema';
// import { SelectBasketDto } from './dto/basket.dto';
// import { PaymentService } from '../payment/services/payment.service';
// import { RepositoryService } from '../repository/repository.service';
// import { SettingsService } from '../settings/settings.service';
// import { PaginationDto } from '../repository/dto/repository.dto';

// @Injectable()
// export class BasketService extends BaseRepositoryService<BasketDocument> {
//   constructor(
//     @InjectModel(Basket.name)
//     private basketModel: Model<BasketDocument>,
//     private userService: UserService,
//     private mailService: MailService,
//     private settingService: SettingsService,
//     private transactionService: TransactionService,
//     private repositoryService: RepositoryService,
//     @Inject(forwardRef(() => PaymentService))
//     private paymentService: PaymentService,
//   ) {
//     super(basketModel);
//   }

//   async upgradeToPremium(
//     userId: string,
//     amountPaid: number,
//     paymentObject: any,
//   ) {
//     const user = await this.userService.findOneById(userId);

//     if (!user) {
//       throw new BadRequestException('User not found');
//     }

//     if (user.basket === BasketTypeEnum.PREMIUM) {
//       throw new BadRequestException('User already has premium subscription');
//     }

//     // Create or find a pending transaction for the premium upgrade
//     let transaction = await this.transactionService.findOneQuery({
//       options: {
//         user: userId,
//         type: TransactionTypeEnum.PremiumBasket,
//         status: TransactionStatusEnum.Pending,
//       },
//     });

//     if (!transaction) {
//       transaction = await this.transactionService.create({
//         user: userId,
//         basket: user._id.toString(),
//         status: TransactionStatusEnum.Pending,
//         totalAmount: 1000,
//         description: 'premium basket subscription payment',
//         type: TransactionTypeEnum.PremiumBasket,
//         metadata: paymentObject,
//         settlement: 0,
//         paymentMethod: 'paystack',
//       });
//       if (!transaction) {
//         return;
//       }
//     }

//     let sessionCommitted = false;
//     const session = await this.basketModel.db.startSession();
//     session.startTransaction();

//     try {
//       // await this.transactionService.updateQuery(
//       //   { _id: transaction._id },
//       //   { status: TransactionStatusEnum.Completed },
//       //   session,
//       // );

//       const existingBasket = await this.basketModel.findOne({ user: user._id });

//       const basketOperation = existingBasket
//         ? await this.basketModel.findByIdAndUpdate(
//             existingBasket._id,
//             {
//               plan: BasketTypeEnum.PREMIUM,
//             },
//             { new: true },
//           )
//         : await this.basketModel.create({
//             user: user._id.toString(),
//             plan: BasketTypeEnum.PREMIUM,
//           });

//       await Promise.all([
//         basketOperation,
//         await this.userService.updateUserById(user._id.toString(), {
//           basket: BasketTypeEnum.PREMIUM,
//         }),
//       ]);

//       const basket = await this.getUserBasket(userId);

//       await this.transactionService.updateQuery(
//         { _id: transaction._id },
//         {
//           status: TransactionStatusEnum.Completed,
//           basket: basket._id.toString(),
//         },
//         session,
//       );

//       await session.commitTransaction();
//       sessionCommitted = true;

//       // Send email notifications for successful upgrade
//       await Promise.all([
//         this.mailService.sendEmail(
//           user.email,
//           'Premium Upgrade Successful',
//           premiumBasketNotificationEmailTemplate({
//             user: [user.email.split('@')[0]],
//             basketNumber: basket._id.toString(),
//             upgradeDate: new Date().toLocaleDateString(),
//             totalAmount: amountPaid / 1000,
//             currencySymbol: '₦',
//           }),
//         ),
//         this.mailService.sendEmail(
//           'greenBounty@gmail.com',
//           'New Premium Subscription',
//           premiumBasketNotificationEmailTemplate({
//             user: [user.email.split('@')[0]],
//             basketNumber: basket._id.toString(),
//             upgradeDate: new Date().toLocaleDateString(),
//             totalAmount: amountPaid / 1000,
//             currencySymbol: '₦',
//           }),
//         ),
//       ]);

//       return transaction;
//     } catch (error) {
//       if (!sessionCommitted) {
//         await session.abortTransaction();
//       }
//     } finally {
//       await session.endSession();
//     }
//   }

//   async selectBasket(user: UserDocument, payload: SelectBasketDto) {
//     console.log('user to upgrade', user);

//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     const [existingBasket] = await Promise.all([
//       await this.basketModel.findOne({ user: user._id }),
//     ]);

//     if (payload.plan === BasketTypeEnum.STANDARD) {
//       const basketOperation = existingBasket
//         ? await this.basketModel.findByIdAndUpdate(
//             existingBasket._id,
//             {
//               plan: BasketTypeEnum.STANDARD,
//             },
//             { new: true },
//           )
//         : await this.basketModel.create({
//             user: user._id.toString(),
//             plan: BasketTypeEnum.STANDARD,
//           });

//       await Promise.all([
//         basketOperation,
//         await this.userService.updateUserById(user._id.toString(), {
//           basket: BasketTypeEnum.STANDARD,
//         }),
//       ]);
//     } else {
//       // Premium basket flow
//       const { premiumPricing: premiumBasketPrice } =
//         await this.settingService.getSettings();

//       return await this.constructPaymentPayloadForUpgrade(
//         user,
//         premiumBasketPrice,
//       );
//     }
//   }

//   async constructPaymentPayloadForUpgrade(user: UserDocument, amount: number) {
//     const activePaymentProvider = await this.paymentService.findOneQuery({
//       options: { active: true },
//     });

//     console.log('activePaymentProvider ', activePaymentProvider);

//     if (!activePaymentProvider) {
//       throw new NotFoundException('No active payment provider found');
//     }

//     let paymentUrl: string;
//     switch (activePaymentProvider.name) {
//       case PaymentProvidersEnum.PAYSTACK:
//         paymentUrl =
//           await this.paymentService.initializePaymentByPaymentProvider(
//             activePaymentProvider.name as PaymentProvidersEnum,
//             {
//               reference: `upgrade-${user._id}-${Date.now()}`,
//               amount,
//               email: user.email,
//               metadata: {
//                 basketId: user._id.toString(),
//                 upgradeType: 'premium',
//               },
//             } as IBaseInitializePayment,
//           );
//         break;
//       case PaymentProvidersEnum.FLUTTERWAVE:
//         paymentUrl =
//           await this.paymentService.initializePaymentByPaymentProvider(
//             activePaymentProvider.name as PaymentProvidersEnum,
//             {
//               tx_ref: `upgrade-${user._id}-${Date.now()}`,
//               amount,
//               currency: 'NGN',
//               redirect_url: null,
//               meta: {
//                 userId: user._id.toString(),
//                 upgradeType: 'premium',
//               },
//               customer: {
//                 email: user.email,
//               },
//             } as IFlutterwaveInitializePayment,
//           );
//         break;
//       default:
//         throw new UnprocessableEntityException(
//           'Unable to process payment, please try again later.',
//         );
//     }

//     return paymentUrl;
//   }

//   async getUserBasket(userId: string) {
//     return this.basketModel.findOne({ user: userId });
//   }

//   async getAllBaskets(query: PaginationDto) {
//     const result = await this.repositoryService.paginate({
//       model: this.basketModel,
//       query,
//       options: { isDeleted: { $ne: true } },
//     });

//     return {
//       ...result,
//       data: await this.basketModel.populate(result.data, 'user'),
//     };
//   }
// }
