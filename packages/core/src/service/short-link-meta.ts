import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { ShortLinkData } from '../entity/shortLinkData.entity';
import { Repository } from 'typeorm';
import { ShortLinkDataModel } from '../interface';

@Provide()
export class ShortLinkDataService {
  @InjectEntityModel(ShortLinkData)
  shortLinkDataModel: Repository<ShortLinkData>;

  async createShortLinkData(
    shortLinkDataParams: ShortLinkDataModel
  ): Promise<number> {
    const shortLinkData = new ShortLinkData();
    shortLinkData.document = shortLinkDataParams.document;
    shortLinkData.isDel = shortLinkDataParams.isDel || false;
    const { id } = await this.shortLinkDataModel.save(shortLinkData);
    return id;
  }
}
