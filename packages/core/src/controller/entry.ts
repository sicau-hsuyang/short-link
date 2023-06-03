import { Controller, Get, Inject, Param, Redirect } from '@midwayjs/core';
import { Context } from 'egg';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  @Redirect('https://changba.com', 302)
  async index() {}

  @Get('/:uuid')
  async entry(@Param('uuid') uuid: string) {
    console.log(uuid);
    console.log(this.ctx.query);
    return 'Hello Midwayjs!';
  }
}
