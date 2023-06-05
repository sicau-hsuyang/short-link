import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Del,
  Query,
} from '@midwayjs/core';
import { HttpResponse, ShortLinkViewModel, Pagination } from '../interface';
import { ShortLinkService } from '../service/short-link';
import { BaseController } from './base';

@Controller('/api/admin')
export class ManageController extends BaseController {
  @Inject()
  private shortLinkService: ShortLinkService;

  @Get('/list')
  async getList(
    @Query('pageSize') pageSize: number,
    @Query('pageNum') pageNum: number,
    @Query('code') code: string,
    @Query('isApply') isApply: boolean,
    @Query('beginTime') beginTime: string,
    @Query('endTime') endTime: string,
    @Query('beforeCreateTime') beforeCreateTime: string,
    @Query('afterCreateTime') afterCreateTime: string
  ) {
    return (await this.execWithHandlerError(
      this.shortLinkService.getModelList,
      {
        pageSize,
        pageNum,
        uuid: code,
        isApply,
        beginTime,
        endTime,
        beforeCreateTime,
        afterCreateTime,
      }
    )) as HttpResponse<Pagination<ShortLinkViewModel>>;
  }

  @Del('/del')
  async deleteEntity(@Query('id') id: number) {
    return (await this.execWithHandlerError(
      this.shortLinkService.deleteModel,
      id
    )) as HttpResponse<number>;
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
