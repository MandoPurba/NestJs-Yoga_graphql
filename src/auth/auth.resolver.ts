import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { InternalServerErrorException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean, { name: 'signUp' })
  async signUp(@Args('payload') dto: AuthDto): Promise<boolean> {
    try {
      return await this.authService.singUp(dto);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Mutation(() => String, { name: 'signIn'})
  async signIn(@Args('payload') dto: AuthDto) {
    try {
      return await this.authService.signIn(dto);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
