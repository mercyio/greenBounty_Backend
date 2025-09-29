import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { ENVIRONMENT } from '../configs/environment';
import { BadRequestException } from '@nestjs/common';
// import { nanoid } from 'nanoid';
import { CacheHelper } from './redis.util';
import { ITEM_WEIGHTS } from '../enums/recycle.enum';

const encryptionKeyFromEnv = ENVIRONMENT.APP.ENCRYPTION_KEY;

export class BaseHelper {
  static generateRandomString(length = 8) {
    return randomBytes(length).toString('hex');
  }

  static async hashData(data: string) {
    return await bcrypt.hash(data, 12);
  }

  static async compareHashedData(data: string, hashed: string) {
    return await bcrypt.compare(data, hashed);
  }
  static generateOTP(): number {
    return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  }

  static isValidFileNameAwsUpload = (fileName: string) => {
    const regex = /^[a-zA-Z0-9_\-/]+\/[a-zA-Z0-9_\-]+(?:\.(jpg|png|jpeg))$/;
    return regex.test(fileName);
  };

  static encryptData(
    data: string,
    encryptionKey: string = encryptionKeyFromEnv,
  ): string {
    console.log('data', data);
    console.log('encryption key', encryptionKey);

    const iv = randomBytes(16); // Generate a 16-byte IV
    const cipher = createCipheriv(
      'aes-256-cbc',
      Buffer.from(encryptionKey),
      iv,
    );

    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return iv.toString('hex') + ':' + encryptedData;
  }

  static decryptData(
    encryptedData: string,
    encryptionKey: string = encryptionKeyFromEnv,
  ): string {
    const parts = encryptedData.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = parts.join(':');
    const decipher = createDecipheriv(
      'aes-256-cbc',
      Buffer.from(encryptionKey),
      iv,
    );
    let decryptedData = decipher.update(encryptedText, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
  }

  /**
   * Generate 32 bytes (256 bits) of random data for AES-256 encryption
   *
   * @return {string} hexadecimal string representing the encryption key
   */
  static generateEncryptionKey(): string {
    const keyBytes = randomBytes(16);
    // Convert the random bytes to a hexadecimal string
    const encryptionKey = keyBytes.toString('hex');

    return encryptionKey;
  }

  static generateFileName(folderName = 'uploads', mimetype: string) {
    const timeStampInMilliSeconds = Date.now();
    return `${folderName}/${timeStampInMilliSeconds}.${mimetype.split('/')[1]}`;
  }

  static validatePassword(password: string): boolean {
    // Regular expression pattern for password validation
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\W_]{3,20}$/;

    // Check if the password matches the pattern
    const isValid = passwordPattern.test(password);

    if (!isValid) {
      throw new BadRequestException(
        'Invalid password format. Password must include at least one letter and one number.',
      );
    }

    return true;
  }

  static generateReferralCode(name: string): string {
    const formattedName = name.toLowerCase().replace(/\s+/g, '');
    const uniqueId = Math.random().toString(36).substring(2, 8);
    const referralCode = `GB_${formattedName}${uniqueId}`;
    return referralCode;
  }

  static calculateWeight(item: string, quantity: number) {
    // Normalize the item name to lowercase
    const normalizedItem = item.toLowerCase();

    // Check if the item exists in ITEM_WEIGHTS
    if (ITEM_WEIGHTS.hasOwnProperty(normalizedItem)) {
      return ITEM_WEIGHTS[normalizedItem] * quantity;
    } else {
      // If item doesn't exist, return 0 or throw an error
      throw new Error(`Item "${item}" is not defined in ITEM_WEIGHTS`);
    }
  }

  // static generateReferralCode(userId: string): string {
  //   // Generate a unique referral code for the user by combining the first 4 and last 3 digits of the user's ID
  //   const uniqueId =
  //     userId.toString().slice(0, 4) + userId.toString().slice(-3);
  //   const randomChars = nanoid(6);

  //   return `GB-${uniqueId}${randomChars}`;
  // }
}

export const CacheHelperUtil = new CacheHelper();

// const res = BaseHelper.generateEncryptionKey();
// console.log('res', res);
