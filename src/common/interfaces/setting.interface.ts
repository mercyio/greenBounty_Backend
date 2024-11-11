export interface ISettings {
  points: {
    referral: number;
    signup: number;
    standardBasketRecyclingPoint: number;
    premiumBasketRecyclingPoint: number;
  };
  price: {
    premiumPricing: number;
  };

  coin: {
    name: string;
    symbol: string;
  };
}
