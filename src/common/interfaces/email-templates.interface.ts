export interface IWelcomeEmailTemplate {
  name: string;
}

export interface ISubscribeToWaitListEmailTemplate {
  name: string;
}

export interface IVerifyEmailTemplate {
  code: number;
  name: string;
}

export type ISendResetPasswordEmailTemplate = IVerifyEmailTemplate;
