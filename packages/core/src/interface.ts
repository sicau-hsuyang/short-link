/**
 * @description User-Service parameters
 */
export interface IShortLinkOptions {
  uid: string;
}

export interface HttpResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export interface HttpSuccessResponse<T> extends HttpResponse<T> {
  code: 1;
  msg: string;
  data: T;
}

export interface HttpErrorResponse<T> extends HttpResponse<T> {
  code: -1;
  msg: string;
  data: null;
}

export interface ShortLinkViewModel {
  id?: string;

  uuid?: string;

  createTime?: Date;

  updateTime?: Date;

  deleteTime?: Date;

  createUser?: string;

  updateUser?: string;

  /**
   * 跳转的长链地址
   */
  link: string;
  /**
   * 开始有效时间
   */
  startTime?: string;
  /**
   * 结束有效时间
   */
  endTime?: string;
  /**
   * 投放类型
   */
  putType: number;
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
  shortLinkId: number;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IShortLinkOptions;
}
