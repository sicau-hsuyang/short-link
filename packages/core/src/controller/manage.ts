import { Body, Controller, Inject, Post, Put } from '@midwayjs/core';
import { ShortLinkViewModel } from '../interface';
import { ShortLinkDataService } from '../service/short-link-meta';
import { ShortLinkService } from '../service/short-link';

@Controller('/admin')
export class ManageController {
  @Inject()
  shortLinkDataService: ShortLinkDataService;

  @Inject()
  shortLinkService: ShortLinkService;

  @Put('/save')
  async createEntity(@Body() shortLink: ShortLinkViewModel) {
    // 存储元数据
    const metaId = await this.shortLinkDataService.createShortLinkData({
      document: JSON.stringify(shortLink.dictionary),
      isDel: false,
    });
    this.shortLinkService.createModel()
  }

  @Post('/save')
  updateEntity() {}
}
