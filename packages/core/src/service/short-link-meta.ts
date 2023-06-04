import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { ShortLinkData } from '../entity/shortLinkData.entity';
import { Repository } from 'typeorm';
import { ShortLinkDataModel } from '../interface';

@Provide()
export class ShortLinkDataService {
  @InjectEntityModel(ShortLinkData)
  shortLinkDataModel: Repository<ShortLinkData>;

  /**
   * 创建短链保存的关联信息
   * @param shortLinkDataParams
   * @returns
   */
  createShortLinkData: (
    shortLinkDataParams: ShortLinkDataModel
  ) => Promise<ShortLinkData> = async (
    shortLinkDataParams: ShortLinkDataModel
  ) => {
    const shortLinkData = new ShortLinkData();
    shortLinkData.shortLinkId = shortLinkDataParams.shortLinkId;
    shortLinkData.document = shortLinkDataParams.document;
    shortLinkData.isDel = shortLinkDataParams.isDel || false;
    const saved = await this.shortLinkDataModel.save(shortLinkData);
    return saved;
  };

  /**
   * 根据短链的ID获取其保存的元数据
   * @param shortLinkId
   */
  getShortLinkDataListByShortLinkId: (
    shortLinkId: number
  ) => Promise<ShortLinkData[]> = async (shortLinkId: number) => {
    return await this.shortLinkDataModel.find({
      where: {
        shortLinkId: shortLinkId,
      },
    });
  };
}
