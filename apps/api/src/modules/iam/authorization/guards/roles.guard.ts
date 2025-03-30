import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ROLES } from '../roles.constants';
import { AccessTokenPayload } from '../../authentication/interfaces/access-token-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const contextRoles = this.reflector.getAllAndOverride<
      (keyof typeof ROLES)[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!contextRoles) {
      return true;
    }
    const user: AccessTokenPayload = context.switchToHttp().getRequest()[
      'user'
    ];
    return contextRoles.some((role) => user.role === role);
  }
}
