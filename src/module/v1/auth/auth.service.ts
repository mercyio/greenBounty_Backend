import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto, GoogleAuthDto } from '../user/dto/user.dto';
import { UserService } from '../user/services/user.service';
import {
  ForgotPasswordDto,
  LoginDto,
  RequestVerifyEmailOtpDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from './dto/auth.dto';
import { BaseHelper } from '../../../common/utils/helper.util';
import { JwtService } from '@nestjs/jwt';
// import { UserRoleEnum } from 'src/common/enums/user.enum';
import { OtpTypeEnum } from 'src/common/enums/otp.enum';
import { OtpService } from '../otp/otp.service';
import { SettingsService } from '../settings/settings.service';
import { UserRoleEnum } from 'src/common/enums/user.enum';
import { ENVIRONMENT } from 'src/common/configs/environment';
import { MailService } from '../mail/mail.service';
import { welcomeEmailTemplate } from '../mail/templates/welcome.email';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private otpService: OtpService,
    private settingService: SettingsService,
    private mailService: MailService,
  ) {}

  async register(payload: CreateUserDto) {
    const user = await this.userService.createUser(payload);

    await this.otpService.sendOTP({
      email: user.email,
      type: OtpTypeEnum.VERIFY_EMAIL,
    });

    return user;
  }

  async login(payload: LoginDto) {
    const { email, password } = payload;

    if (
      email === ENVIRONMENT.ADMIN.EMAIL ||
      password === ENVIRONMENT.ADMIN.PASSWORD
    ) {
      let adminUser =
        await this.userService.getUserByEmailIncludePassword(email);

      if (!adminUser) {
        adminUser = await this.userService.createUser(
          {
            email,
            password,
            name: ENVIRONMENT.ADMIN.NAME,
          },
          UserRoleEnum.ADMIN,
        );
      }

      await this.userService.updateUserByEmail(email, {
        isLoggedOut: false,
      });

      const token = this.jwtService.sign({ _id: adminUser._id });
      delete adminUser['_doc'].password;
      return {
        ...adminUser['_doc'],
        accessToken: token,
      };
    }

    const user = await this.userService.getUserByEmailIncludePassword(email);

    if (!user) {
      throw new BadRequestException('Invalid Credential');
    }

    const passwordMatch = await BaseHelper.compareHashedData(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new BadRequestException('Incorrect Password');
    }

    if (!user.emailVerified) {
      throw new BadRequestException('kindly verify your email to login');
    }

    await this.userService.updateUserByEmail(email, {
      isLoggedOut: false,
    });

    // await this.otpService.sendOTP({
    //   email: user.email,
    //   type: OtpTypeEnum.WELCOME_MESSAGE,
    // });

    const token = this.jwtService.sign({ _id: user._id });
    delete user['_doc'].password;
    return {
      ...user['_doc'],
      accessToken: token,
    };
  }

  async verifyEmail(payload: VerifyEmailDto) {
    const { code, email } = payload;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid Email');
    }

    if (user.emailVerified) {
      throw new UnprocessableEntityException('Email already verified');
    }

    await this.otpService.verifyOTP({
      code,
      email,
      type: OtpTypeEnum.VERIFY_EMAIL,
    });

    const { signup: signupPoint, referral: referralPoint } =
      await this.settingService.getSettings();

    await this.userService.updateUserByEmail(email, {
      emailVerified: true,
      wallet: signupPoint,
    });

    if (user.referredBy) {
      const referrer = user.referredBy.toString().trim();

      await this.userService.updateUserById(referrer, {
        isReferralBonusClaimed: true,
        $inc: {
          wallet: referralPoint,
        },
      });
    }

    const welcomeEmailName = user?.name || 'User';
    await this.mailService.sendEmail(
      user.email,
      `Welcome To ${ENVIRONMENT.APP.NAME}`,
      welcomeEmailTemplate({
        name: welcomeEmailName,
      }),
    );
  }

  async sendVerificationMail(payload: RequestVerifyEmailOtpDto) {
    await this.userService.checkUserExistByEmail(payload.email);
    await this.otpService.sendOTP({
      ...payload,
      type: OtpTypeEnum.VERIFY_EMAIL,
    });
  }

  async sendPasswordResetEmail(payload: ForgotPasswordDto) {
    await this.userService.checkUserExistByEmail(payload.email);

    await this.userService.updateUserByEmail(payload.email, {
      emailVerified: false,
    });

    await this.otpService.sendOTP({
      ...payload,
      type: OtpTypeEnum.VERIFY_EMAIL,
    });
  }

  async verifyPasswordResetEmail(payload: VerifyEmailDto) {
    const { code, email } = payload;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid Email');
    }

    await this.userService.updateUserByEmail(payload.email, {
      emailVerified: true,
    });

    await this.otpService.verifyOTP({
      code,
      email,
      type: OtpTypeEnum.VERIFY_EMAIL,
    });
  }

  async resetPassword(payload: ResetPasswordDto) {
    const { email, password, confirmPassword } = payload;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid Email');
    }

    if (!user.emailVerified) {
      throw new BadRequestException(
        'kindly verify your email to reset your password',
      );
    }

    if (password !== confirmPassword) {
      throw new ConflictException('Passwords do not match');
    }

    const hashedPassword = await BaseHelper.hashData(password);

    await this.userService.updateUserByEmail(email, {
      password: hashedPassword,
    });
  }

  async googleAuth(payload: GoogleAuthDto) {
    const { email } = payload;

    const user = await this.userService.getUserByEmail(email);

    if (user) {
      if (!user.isGoogleAuth) {
        throw new ConflictException(
          'Looks like you already have an account! Use your existing login details or choose a different email address to sign up with Google',
        );
      }
      await this.userService.updateUserByEmail(email, {
        isLoggedOut: false,
      });

      const token = this.jwtService.sign({ _id: user._id });
      return { ...user['_doc'], accessToken: token };
    }

    const newUser = await this.userService.createUserFromGoogle(payload);

    const token = this.jwtService.sign({ _id: newUser._id });
    return { ...newUser['_doc'], accessToken: token };
  }
}
