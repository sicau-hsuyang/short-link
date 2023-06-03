/**
 * 投放类型
 */
export enum PutTypeEnum {
  H5 = 0,
}

export const PutTypeOptions = [
  {
    label: "H5",
    value: PutTypeEnum.H5,
  },
] as const;
