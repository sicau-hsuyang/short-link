import { Provide } from '@midwayjs/core';
import { IShortLinkOptions } from '../interface';

@Provide()
export class ShortLinkService {
  async getEntity(options: IShortLinkOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}
