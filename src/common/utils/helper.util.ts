import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import * as bcrypt from 'bcrypt';
import { ENVIRONMENT } from '../configs/environment';
import { BadRequestException } from '@nestjs/common';

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
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  }

  static isValidFileNameAwsUpload = (fileName: string) => {
    const regex = /^[a-zA-Z0-9_\-/]+\/[a-zA-Z0-9_\-]+(?:\.(jpg|png|jpeg))$/;
    return regex.test(fileName);
  };

  static encryptData(
    data: string,
    encryptionKey: string = encryptionKeyFromEnv,
  ): string {
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
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W_])[a-zA-Z\d\W_]{3,20}$/;

    // Check if the password matches the pattern
    const isValid = passwordPattern.test(password);

    if (!isValid) {
      throw new BadRequestException(
        'Invalid password format. Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 number or special character.',
      );
    }

    return true;
  }
}
