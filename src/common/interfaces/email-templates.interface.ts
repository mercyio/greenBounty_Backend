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

export interface IPremiumBasketTemplate {
  user: string[];
  basketNumber: string;
  upgradeDate: string;
  // items: Array<{
  //   product: {
  //     name: string;
  //     pricePerPortion: number;
  //   };
  //   quantity: number;
  // }>;
  // subtotal: number;
  // deliveryFee: number;
  totalAmount: number;
  // deliveryType: string;
  // deliveryAxis: {
  //   name: string;
  // };
  // deliveryAddress: string;
  currencySymbol: string;
}

export interface IPremiumBasketNotificationTemplate {
  user: string[];
  basketNumber: string;
  upgradeDate: string;
  // items: Array<{
  //   product: {
  //     name: string;
  //     pricePerPortion: number;
  //   };
  //   quantity: number;
  // }>;
  // subtotal: number;
  // deliveryFee: number;
  totalAmount: number;
  // deliveryType: string;
  // deliveryAxis: {
  //   name: string;
  // };
  // deliveryAddress: string;
  currencySymbol: string;
}

export interface IWaitlistEmailTemplate {
  name: string;
}
