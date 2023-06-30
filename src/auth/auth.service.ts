import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async singUp({ email, password }: AuthDto) {
    const hash = await argon.hash(password);
    try {
      return await this.prisma.user
        .create({
          data: {
            email,
            password: hash,
            createdBy: email.split('@')[0],
            createdAt: new Date(),
          },
        })
        .then(() => {
          return true;
        });
    } catch (e) {
      throw e;
    }
  }

  async signIn({ email, password }: AuthDto) {
    try {
      // FIND USER
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      // IF USER NOT EXIST THROW ERROR
      if (!user) throw new ForbiddenException('Credentials incorrect');
      // COMPARE PASSWORD
      const match = await argon.verify(user.password, password);
      // IF PASSWORD NOT MATCH THROW ERROR
      if (!match) {
        return null;
      }
      delete user.password;
      // CEK USER
      if (!user) throw new UnauthorizedException();

      // RETURN ACCESS TOKEN
      return this.signToken(user.id, user.email, user.role);
    } catch (e) {
      throw e;
    }
  }
  async validate(id: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      });
      delete user.password;
      return user;
    } catch (e) {
      throw e;
    }
  }

  async signToken(userId: string, email: string, role: string) {
    const payload = {
      sub: userId,
      email,
      role,
    };
    const secret = this.config.get('JWT_SECRET');
    return this.jwt.sign(payload, {
      secret,
    });
  }

  verifyToken(token: string) {
    const secret = this.config.get('JWT_SECRET');
    return this.jwt.verify(token, {
      secret,
    });
  }
}
