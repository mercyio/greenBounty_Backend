import * as dotenv from 'dotenv';
dotenv.config();

export interface IEnvironment {
  APP: {
    NAME: string;
    PORT: number | string;
    ENV: string;
    ENCRYPTION_KEY: string;
    SU_SS_KEY: string;
  };
  DB: {
    URL: string;
  };
  JWT: {
    SECRET: string;
  };
  MAILER: {
    SMTP: string;
    HOST: string;
    PORT: string;
    EMAIL: string;
    PASSWORD: string;
  };
  AWS: {
    ACCOUNT_ID: string;
    REGION: string;
    ACCESS_KEY: string;
    SECRET: string;
    BUCKET_NAME: string;
    BUCKET_URL: string;
  };
  REDIS: {
    URL: string;
  };
  AGORA: {
    APP_ID: string;
    APP_CERTIFICATE: string;
  };

  ADMIN: {
    EMAIL: string;
    PASSWORD: string;
    NAME: string;
  };
  TWILLO: {
    ACCOUNT_ID: string;
    AUTH_TOKEN: string;
    FROM: string;
  };
  FLUTTERWAVE: {
    HOST: string;
    WEBHOOK_SECRET: string;
  };
  PAYSTACK: {
    HOST: string;
    WEBHOOK_SECRET: string;
  };
  VPAY: {
    HOST: string;
    WEBHOOK_SECRET: string;
  };
}

export const ENVIRONMENT: IEnvironment = {
  APP: {
    NAME: process.env.APP_NAME,
    PORT: process.env.PORT || process.env.APP_PORT || 3000,
    ENV: process.env.APP_ENV,
    ENCRYPTION_KEY: process.env.APP_ENCRYPTION_KEY,
    SU_SS_KEY: process.env.SU_SS_KEY,
  },
  DB: {
    URL: process.env.DB_URL,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
  },
  MAILER: {
    SMTP: process.env.AUTH_SMTP,
    HOST: process.env.AUTH_HOST,
    PORT: process.env.AUTH_PORT,
    EMAIL: process.env.AUTH_EMAIL,
    PASSWORD: process.env.AUTH_PASSWORD,
  },
  AWS: {
    ACCOUNT_ID: process.env.AWS_ACCOUNT_ID,
    REGION: process.env.AWS_REGION,
    ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    SECRET: process.env.AWS_SECRET,
    BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    BUCKET_URL: process.env.AWS_BUCKET_URL,
  },
  REDIS: {
    URL: process.env.REDIS_URL,
  },
  AGORA: {
    APP_ID: process.env.AGORA_APP_ID,
    APP_CERTIFICATE: process.env.AGORA_APP_CERTIFICATE,
  },
  ADMIN: {
    EMAIL: process.env.ADMIN_EMAIL,
    PASSWORD: process.env.ADMIN_PASSWORD,
    NAME: process.env.ADMIN_NAME,
  },
  TWILLO: {
    ACCOUNT_ID: process.env.ACCOUNT_ID,
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    FROM: process.env.FROM,
  },
  FLUTTERWAVE: {
    HOST: process.env.FLUTTERWAVE_HOST,
    WEBHOOK_SECRET: process.env.FLUTTERWAVE_WEBHOOK_SECRET,
  },
  PAYSTACK: {
    HOST: process.env.PAYSTACK_HOST,
    WEBHOOK_SECRET: process.env.PAYSTACK_WEBHOOK_SECRET,
  },
  VPAY: {
    HOST: process.env.VPAY_HOST,
    WEBHOOK_SECRET: process.env.VPAY_WEBHOOK_SECRET,
  },
};
