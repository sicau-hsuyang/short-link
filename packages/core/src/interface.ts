/**
 * @description User-Service parameters
 */
export interface IShortLinkOptions {
  uid: string;
}

export interface ShortLinkViewModel {
  /**
   * 跳转的长链地址
   */
  link: string;
  /**
   * 开始有效时间
   */
  startTime: string;
  /**
   * 结束有效时间
   */
  endTime: string;
  /**
   * 绑定的数据
   */
  dictionary: Array<{
    prop: string;
    value: string;
  }>;
  /**
   * 是否应用
   */
  isApply: boolean;
}

export interface ShortLinkModel {
  /**
   * 跳转的长链地址
   */
  link: string;
  /**
   * 元数据ID
   */
  metaId: string;
  /**
   * 开始有效时间
   */
  startTime: string;
  /**
   * 结束有效时间
   */
  endTime: string;
  /**
   * 是否应用
   */
  isApply: boolean;
}

export interface ShortLinkDataModel {
  document: string;
  isDel?: boolean;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IShortLinkOptions;
}
