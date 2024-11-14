export enum RecycleItemTypeEnum {
  NYLON = 'NYLON',
  PAPER = 'PAPER',
  PLASTIC = 'PLASTIC',
  METAL = 'METAL',
  CAN = 'CAN',
  IRON = 'IRON',
}

export const STANDARD_ALLOWED_ITEMS = [
  RecycleItemTypeEnum.NYLON,
  RecycleItemTypeEnum.PAPER,
  RecycleItemTypeEnum.PLASTIC,
];

export const PREMIUM_ALLOWED_ITEMS = [
  ...STANDARD_ALLOWED_ITEMS,
  RecycleItemTypeEnum.METAL,
  RecycleItemTypeEnum.CAN,
  RecycleItemTypeEnum.IRON,
];

export const ITEM_WEIGHTS = {
  plastic: 0.02, // kg
  nylon: 0.007, // kg
  can: 0.015, // kg
  metal: 0.03, // kg
  paper: 0.02,
  iron: 0.05,
};
