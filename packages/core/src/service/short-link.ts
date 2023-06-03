import { Provide } from '@midwayjs/core';
import { ShortLink } from '../entity/shortLink.entity';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { ShortLinkDataModel } from '../interface';

@Provide()
export class ShortLinkService {
  @InjectEntityModel(ShortLink)
  shortLinkModal: Repository<ShortLink>;

  createModel(model: ShortLinkDataModel) {}
}
