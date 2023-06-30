import { Module } from '@nestjs/common';
import { YogaGraphqlModule } from '../config/yoga-graphql/yoga-graphql.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from "../config/prisma/prisma.module";
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    YogaGraphqlModule,
    PrismaModule,
    AuthModule,
    UserModule,
    ProfileModule,
  ],
})
export class AppsModule {}
