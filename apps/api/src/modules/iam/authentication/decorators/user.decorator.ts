import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Request } from 'express';

export const User = createParamDecorator((data, ctx: ExecutionContextHost) => {
  const req: Request = ctx.switchToHttp().getRequest();
  return req.user;
});
