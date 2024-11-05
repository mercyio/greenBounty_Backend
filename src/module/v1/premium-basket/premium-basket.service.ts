import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user/services/user.service';
import { Model } from 'mongoose';
import {
  TransactionStatusEnum,
  TransactionTypeEnum,
} from 'src/common/enums/transaction.enum';
import { BaseRepositoryService } from '../repository/base.service';
import { TransactionService } from '../transaction/transaction.service';
import { MailService } from '../mail/mail.service';
import { premiumBasketNotificationEmailTemplate } from '../mail/templates/premium-success.email';
import {
  PremiumBasket,
  PremiumBasketDocument,
} from './schema/premium-basket.schema';
import { BasketTypeEnum } from 'src/common/enums/basket.enum';
import { PaymentProvidersEnum } from 'src/common/enums/payment.enum';
import {
  IBaseInitializePayment,
  IFlutterwaveInitializePayment,
} from 'src/common/interfaces/payment.interface';
import { UserDocument } from '../user/schemas/user.schema';
import { UpgradeToPremiumBasketDto } from './dto/premium-basket.dto';
import { PaymentService } from '../payment/services/payment.service';
import { RepositoryService } from '../repository/repository.service';

@Injectable()
export class PremiumBasketService extends BaseRepositoryService<PremiumBasketDocument> {
  constructor(
    @InjectModel(PremiumBasket.name)
    private premiumModel: Model<PremiumBasketDocument>,
    private userService: UserService,
    private mailService: MailService,
    private transactionService: TransactionService,
    private repositoryService: RepositoryService,
    @Inject(forwardRef(() => PaymentService))
    private paymentService: PaymentService,
  ) {
    super(premiumModel);
  }

  async upgradeToPremium(
    userId: string,
    basketId: string,
    paymentObject: any,
    amountPaid: number,
  ): Promise<void> {
    const user = await this.userService.findOneById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.basket === BasketTypeEnum.PREMIUM) {
      throw new BadRequestException('User already has premium subscription');
    }

    const basket = await this.premiumModel.findById(basketId);

    // Create or find a pending transaction for the premium upgrade
    let transaction = await this.transactionService.findOneQuery({
      options: {
        user: userId,
        type: TransactionTypeEnum.Premium,
        status: TransactionStatusEnum.Pending,
      },
    });

    if (!transaction) {
      transaction = await this.transactionService.create({
        user: userId,
        status: TransactionStatusEnum.Pending,
        totalAmount: amountPaid,
        type: TransactionTypeEnum.Premium,
        metadata: paymentObject,
        settlement: 0,
      });
      if (!transaction) {
        return;
      }
    }

    let sessionCommitted = false;
    const session = await this.premiumModel.db.startSession();
    session.startTransaction();

    try {
      await Promise.all([
        this.userService.updateUserById(userId, {
          basket: BasketTypeEnum.PREMIUM,
        }),
        this.transactionService.updateQuery(
          { _id: transaction._id },
          { status: TransactionStatusEnum.Completed },
          session,
        ),
      ]);

      await session.commitTransaction();
      sessionCommitted = true;

      // Send email notifications for successful upgrade
      await Promise.all([
        this.mailService.sendEmail(
          user.email,
          'Premium Upgrade Successful',
          premiumBasketNotificationEmailTemplate({
            user: user.name,
            basketNumber: basket._id.toString(),
            upgradeDate: new Date().toLocaleDateString(),
            totalAmount: amountPaid,
            currencySymbol: '₦',
          }),
        ),
        this.mailService.sendEmail(
          'greenBounty@gmail.com',
          'New Premium Subscription',
          premiumBasketNotificationEmailTemplate({
            user: user.name,
            basketNumber: basket._id.toString(),
            upgradeDate: new Date().toLocaleDateString(),
            totalAmount: amountPaid,
            currencySymbol: '₦',
          }),
        ),
      ]);
    } catch (error) {
      if (!sessionCommitted) {
        await session.abortTransaction();
      }
    } finally {
      await session.endSession();
    }
  }

  async upgrade(payload: UpgradeToPremiumBasketDto, user: UserDocument) {
    console.log('user to upgrade', user);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const session = await this.premiumModel.db.startSession();
    session.startTransaction();
    let sessionCommitted = false;

    try {
      const premiumPrice = 1000;

      const paymentLink = await this.constructPaymentPayloadForUpgrade(
        user,
        premiumPrice,
      );
      // await this.upgradeToPremium(userId);
      await this.userService.updateUserById(user._id.toString(), {
        basket: BasketTypeEnum.PREMIUM,
      });

      await session.commitTransaction();
      sessionCommitted = true;

      return { message: 'Upgrade successful. Payment link:', paymentLink };
    } catch (error) {
      console.error('error while making upgrades', error);
      if (!sessionCommitted) {
        await session.abortTransaction();
      }
      throw new UnprocessableEntityException(
        'Unable to process upgrade, please try again later.',
      );
    } finally {
      await session.endSession();
    }
  }

  async constructPaymentPayloadForUpgrade(user: UserDocument, amount: number) {
    const activePaymentProvider = await this.paymentService.findOneQuery({
      options: { active: true },
    });

    console.log('activePaymentProvider ', activePaymentProvider);

    if (!activePaymentProvider) {
      throw new NotFoundException('No active payment provider found');
    }

    let paymentUrl: string;
    switch (activePaymentProvider.name) {
      case PaymentProvidersEnum.PAYSTACK:
        paymentUrl =
          await this.paymentService.initializePaymentByPaymentProvider(
            activePaymentProvider.name as PaymentProvidersEnum,
            {
              reference: `upgrade-${user._id}-${Date.now()}`,
              amount,
              email: user.email,
              metadata: {
                basketId: user._id.toString(),
                upgradeType: 'premium',
              },
            } as IBaseInitializePayment,
          );
        break;
      case PaymentProvidersEnum.FLUTTERWAVE:
        paymentUrl =
          await this.paymentService.initializePaymentByPaymentProvider(
            activePaymentProvider.name as PaymentProvidersEnum,
            {
              tx_ref: `upgrade-${user._id}-${Date.now()}`,
              amount,
              currency: 'NGN',
              redirect_url: null,
              meta: {
                userId: user._id.toString(),
                upgradeType: 'premium',
              },
              customer: {
                email: user.email,
              },
            } as IFlutterwaveInitializePayment,
          );
        break;
      default:
        throw new UnprocessableEntityException(
          'Unable to process payment, please try again later.',
        );
    }

    return paymentUrl;
  }
}
