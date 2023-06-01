import { Controller, Get, Inject, Param } from '@midwayjs/core';
import { Context } from 'egg';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async index() {
    return 'index';
  }

  @Get('/:uuid')
  async entry(@Param('uuid') uuid: string) {
    console.log(uuid);
    console.log(this.ctx.query);
    return 'Hello Midwayjs!';
  }
}
