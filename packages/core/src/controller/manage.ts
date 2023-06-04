import { Body, Controller, Get, Inject, Post, Put } from '@midwayjs/core';
import { HttpResponse, ShortLinkViewModel, Pagination } from '../interface';
import { ShortLinkService } from '../service/short-link';
import { BaseController } from './base';

@Controller('/api/admin')
export class ManageController extends BaseController {
  @Inject()
  private shortLinkService: ShortLinkService;

  @Get('/list')
  async getList() {
    return (await this.execWithHandlerError(
      this.shortLinkService.getModelList
    )) as HttpResponse<Pagination<ShortLinkViewModel>>;
  }

  @Put('/save')
  async createEntity(
    @Body() shortLink: ShortLinkViewModel
  ): Promise<HttpResponse<ShortLinkViewModel>> {
    return (await this.execWithHandlerError(
      this.shortLinkService.createModel,
      shortLink
    )) as HttpResponse<ShortLinkViewModel>;
  }

  @Post('/save')
  updateEntity() {}
}
