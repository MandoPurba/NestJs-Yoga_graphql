import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.req.headers.authorization)
      throw new UnauthorizedException('Silahkan Login terlebih dahulu');

    const [type, token] = ctx.req.headers.authorization.split(' ');
    if (type !== 'Bearer' || !token)
      throw new BadRequestException('Token tidak valid');

    const validateToken = this.authService.verifyToken(token);

    // if (validateToken.role !== 'USER')
    //   throw new BadRequestException('Anda tidak dapat mengakses halaman ini');

    // CHECK IF TOKEN iat IS EXPIRED IN 30 MINUTES
    if (
      !validateToken.exp &&
      new Date().getTime() > validateToken.iat * 1000 + 1800000
    )
      throw new UnauthorizedException('Token sudah kadaluarsa');
    // CEK IF TOKEN IS EXPIRED IN 30 MINUTES
    if (new Date().getTime() > validateToken.exp * 1000)
      throw new UnauthorizedException('Token Sudah kadaluarsa');

    ctx['user'] = await this.authService.validate(validateToken.sub);

    return true;
  }
}
