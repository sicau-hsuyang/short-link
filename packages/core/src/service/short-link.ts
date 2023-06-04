import { Inject, Provide } from '@midwayjs/core';
import { ShortLink } from '../entity/shortLink.entity';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { ShortLinkViewModel } from '../interface';
import { ShortLinkDataService } from './short-link-meta';
import { createHashCode } from '../utils';

@Provide()
export class ShortLinkService {
  @InjectEntityModel(ShortLink)
  private shortLinkModal: Repository<ShortLink>;

  @Inject()
  private shortLinkDataService: ShortLinkDataService;

  async createModel(model: ShortLinkViewModel) {
    // 存储元数据
    const shortLink = new ShortLink();
    shortLink.beginTime = model.startTime ? new Date(model.startTime) : null;
    shortLink.endTime = model.endTime ? new Date(model.endTime) : null;
    // TODO: 写死
    shortLink.createUser = 'yangxu';
    shortLink.updateUser = shortLink.createUser;
    shortLink.isApply = model.isApply;
    shortLink.isDel = false;
    shortLink.link = model.link;
    // TODO: 状态暂时还没有定义
    shortLink.state = 0;
    // TODO: 简单粗暴的处理
    shortLink.uuid = createHashCode(shortLink.createUser + '-' + Date.now());
    shortLink.putType = model.putType;
    const savedShortLink = await this.shortLinkModal.save(shortLink);
    const saved = await this.shortLinkDataService.createShortLinkData({
      shortLinkId: savedShortLink.id,
      document: JSON.stringify(model.dictionary),
      isDel: false,
    });
    const response: ShortLinkViewModel = {
      ...savedShortLink,
      dictionary: JSON.parse(saved.document),
    } as unknown as ShortLinkViewModel;
    return response;
  }
}
