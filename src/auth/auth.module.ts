import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.register({
      signOptions: {
        expiresIn: '30m',
      },
    }),
  ],
  exports: [AuthService],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
