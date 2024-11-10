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
