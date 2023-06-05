import { Inject, Provide } from '@midwayjs/core';
import { ShortLink } from '../entity/shortLink.entity';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import {
  Pagination,
  ShortLinkQueryModel,
  ShortLinkViewModel,
} from '../interface';
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

  deleteModel = async (id: number) => {
    await this.shortLinkDataService.deleteByShortLinkId(id);
    const results = await this.shortLinkModel.softDelete(id);
    return results.affected;
  };

  createModel = async (model: ShortLinkViewModel) => {
    // 存储元数据
    const shortLink = new ShortLink();
    shortLink.beginTime = model.beginTime ? new Date(model.beginTime) : null;
    shortLink.endTime = model.endTime ? new Date(model.endTime) : null;
    // TODO: 写死
    shortLink.createUser = 'yangxu';
    shortLink.updateUser = shortLink.createUser;
    shortLink.isApply = model.isApply;
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

  getModelList: (
    options: ShortLinkQueryModel
  ) => Promise<Pagination<ShortLink>> = async (
    options: ShortLinkQueryModel = {}
  ) => {
    const {
      pageNum = 1,
      pageSize = 10,
      uuid = '',
      isApply = '',
      beginTime = '',
      endTime = '',
      beforeCreateTime = '',
      afterCreateTime = '',
    } = options;
    const builder = this.shortLinkModel
      .createQueryBuilder('short_link')
      .where('1=1');
    // 加这个where主要是为了后面的拼接and where  但是又不影响效率
    if (uuid !== '') {
      builder.andWhere('short_link.uuid like :uuid').setParameters({
        uuid: `%${uuid}%`,
      });
    }
    if (isApply !== '') {
      builder.andWhere('short_link.is_apply=:is_apply').setParameters({
        is_apply: isApply,
      });
    }
    if (beginTime !== '') {
      builder.andWhere('short_link.begin_time <= :begin_time').setParameters({
        begin_time: beginTime,
      });
    }
    if (endTime !== '') {
      builder.andWhere('short_link.end_time >= :end_time').setParameters({
        end_time: endTime,
      });
    }

    if (beforeCreateTime !== '' && afterCreateTime !== '') {
      builder
        .andWhere(
          'short_link.create_time <= :after_create_time and short_link.create_time >= :before_create_time'
        )
        .setParameters({
          after_create_time: afterCreateTime,
          before_create_time: beforeCreateTime,
        });
    }
    // 分页之前查询总数
    const total = await builder.getCount();
    // 分页之后返回数据
    const allList = await builder
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getMany();
    return {
      pageSize,
      pageNum,
      total,
      list: allList.sort((a, b) => {
        return b.createTime.getTime() - a.createTime.getTime();
      }),
    };
  };
}
