import { HttpResponse } from '../interface';

export class BaseController {
  execWithHandlerError(
    fn: (...args: unknown[]) => unknown,
    ...args: unknown[]
  ): HttpResponse<unknown> {
    try {
      return fn.apply(this, args);
    } catch (exp) {
      return {
        code: -1,
        msg: exp,
        data: null,
      };
    }
  }
}
