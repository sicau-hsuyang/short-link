import { Inject, Provide } from '@midwayjs/core';
import { ShortLink } from '../entity/shortLink.entity';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { ShortLinkService } from './short-link';

@Provide()
export class ShortLinkManageService {
  @InjectEntityModel(ShortLink)
  shortLinkModel: Repository<ShortLink>;

  @Inject()
  shortLinkService: ShortLinkService;
}
