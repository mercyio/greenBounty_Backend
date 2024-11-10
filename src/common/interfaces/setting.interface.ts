export interface ISettings {
  points: {
    referral: number;
    signup: number;
  };
  price: {
    premiumPricing: number;
  };

  coin: {
    name: string;
    symbol: string;
  };
}
