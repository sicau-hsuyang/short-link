import { HttpResponse } from '../interface';

export class BaseController {
  async execWithHandlerError(
    fn: (...args: unknown[]) => unknown,
    ...args: unknown[]
  ): Promise<HttpResponse<unknown>> {
    try {
      const data = await fn.apply(this, args);
      return {
        code: 1,
        msg: '操作成功',
        data,
      };
    } catch (exp) {
      return {
        code: -1,
        msg: exp,
        data: null,
      };
    }
  }
}
