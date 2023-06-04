import { Inject, Provide } from '@midwayjs/core';
import { ShortLink } from '../entity/shortLink.entity';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Pagination, ShortLinkViewModel } from '../interface';
import { ShortLinkDataService } from './short-link-meta';
import { createHashCode } from '../utils';
import { ShortLinkState } from '../business-config';

@Provide()
export class ShortLinkService {
  @InjectEntityModel(ShortLink)
  protected shortLinkModel: Repository<ShortLink>;

  @Inject()
  protected shortLinkDataService: ShortLinkDataService;

  queryModel = async (uuid: string) => {
    return await this.shortLinkModel.findOne({
      where: {
        uuid,
      },
    });
  };

  createModel = async (model: ShortLinkViewModel) => {
    // 存储元数据
    const shortLink = new ShortLink();
    shortLink.beginTime = model.beginTime ? new Date(model.beginTime) : null;
    shortLink.endTime = model.endTime ? new Date(model.endTime) : null;
    // TODO: 写死
    shortLink.createUser = 'yangxu';
    shortLink.updateUser = shortLink.createUser;
    debugger;
    shortLink.isApply = model.isApply;
    shortLink.isDel = false;
    shortLink.link = model.link;
    shortLink.state = ShortLinkState.Enabled;
    // TODO: 简单粗暴的处理
    shortLink.uuid = createHashCode(shortLink.createUser + '-' + Date.now());
    shortLink.putType = model.putType;
    const savedShortLink = await this.shortLinkModel.save(shortLink);
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
  };

  getModelList: () => Promise<Pagination<ShortLink>> = async () => {
    const [allList, total] = await this.shortLinkModel.findAndCount({});
    return {
      pageSize: 10,
      pageNum: 1,
      total,
      list: allList.sort((a, b) => {
        return b.createTime.getTime() - a.createTime.getTime();
      }),
    };
  };
}
