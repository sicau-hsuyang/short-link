import { Controller, Get, Inject, Param, Redirect } from '@midwayjs/core';
import { Context } from 'egg';
import { ShortLinkService } from '../service/short-link';
import { ShortLinkDataService } from '../service/short-link-meta';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Inject()
  shortLinkService: ShortLinkService;

  @Inject()
  shortLinkDataService: ShortLinkDataService;

  @Get('/')
  @Redirect('https://changba.com', 302)
  async index() {}

  @Get('/:uuid')
  async entry(@Param('uuid') uuid: string) {
    const model = await this.shortLinkService.queryModel(uuid);
    // 没有这个短链
    if (!model) {
      this.ctx.status = 404;
      this.ctx.body = null;
      return;
    }
    const now = new Date();
    // 在有效时间之前进入
    if (model.beginTime != null && now < model.beginTime) {
      this.ctx.status = 404;
      this.ctx.body = null;
      return;
    }
    // 在有效时间之后进入
    if (model.endTime != null && now >= model.endTime) {
      this.ctx.status = 404;
      this.ctx.body = null;
      return;
    }
    const link = model.link;
    this.ctx.redirect(link);
  }
}
