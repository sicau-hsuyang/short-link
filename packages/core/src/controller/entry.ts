import { Controller, Get, Inject, Param, Redirect } from '@midwayjs/core';
import { Context } from 'egg';
import { ShortLinkService } from '../service/short-link';
import { ShortLinkDataService } from '../service/short-link-meta';
import { ShortLinkData } from '../entity/shortLinkData.entity';

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
    // 已经投入生产的短链码，在有效时间之前进入
    if (model.beginTime != null && now < model.beginTime && model.isApply) {
      this.ctx.status = 404;
      this.ctx.body = null;
      return;
    }
    // 已经投入生产的短链码，在有效时间之后进入
    if (model.endTime != null && now >= model.endTime && model.isApply) {
      this.ctx.status = 404;
      this.ctx.body = null;
      return;
    }
    const metaStringList =
      await this.shortLinkDataService.getShortLinkDataListByShortLinkId(
        model.id
      );
    const metaProps = metaStringList
      .map((v: ShortLinkData) => {
        return JSON.parse(v.document);
      })
      .reduce((prevValue, current) => {
        current.forEach(({ prop, value }) => {
          prevValue[prop] = value;
        });
        return prevValue;
      }, {});
    let link = model.link;
    const query = Object.assign({}, this.ctx.query, metaProps);
    // 处理QueryString
    const queryString = Object.entries(query)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join('&');
    // 如果用户配置的长链没有包含查询字符串
    if (link.indexOf('?') < 0 && queryString) {
      link += '?' + queryString;
    } else {
      link += queryString ? '&' + queryString : '';
    }
    this.ctx.redirect(link);
  }
}
