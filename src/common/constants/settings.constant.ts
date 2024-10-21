import { ISettings } from '../interfaces/setting.interface';

export const SETTINGS: ISettings = {
  points: {
    referral: 10,
    signup: 10,
  },
  coin: {
    name: 'Macwin',
    symbol: 'MAC',
    likesToPoints: {
      active: true,
      amount: 2,
    },
  },
};
