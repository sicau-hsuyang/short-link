import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';
import { ShortLink } from '../entity/shortLink.entity';
import { ShortLinkData } from '../entity/shortLinkData.entity';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1685619001563_3471',
    egg: {
      port: 7001,
    },
    security: {
      csrf: true,
    },
    typeorm: {
      dataSource: {
        default: {
          /**
           * 单数据库实例
           */
          type: 'mysql',
          host: 'localhost',
          port: 3307,
          username: 'root',
          password: '12345678',
          database: 'short-link',
          synchronize: true,
          logging: false,
          // 配置实体模型
          entities: [ShortLink, ShortLinkData],
        },
      },
    },
  } as MidwayConfig;
};
