/**
 * @description User-Service parameters
 */
export interface IShortLinkOptions {
  uid: string;
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IShortLinkOptions;
}
