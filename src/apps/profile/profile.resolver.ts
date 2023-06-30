import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './entities/profile.entity';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { AdminGuard, AuthGuard } from '../../auth/guard';
import { User } from '@prisma/client';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Profile)
  createProfile(
    @Args('payload') createProfileInput: CreateProfileInput,
    @Context('user') user: User,
  ) {
    try {
      return this.profileService.create(
        user.email.split('@')[0],
        user.id,
        createProfileInput,
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => [Profile], { name: 'profiles' })
  findAll() {
    try {
      return this.profileService.findAll();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => Profile, { name: 'profile' })
  findOne(@Context('user') user: User) {
    try {
      return this.profileService.findOne(user.id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Profile)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
    @Context('user') user: User,
  ) {
    try {
      return this.profileService.update(
        user.id,
        user.email.split('@')[0],
        updateProfileInput,
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Profile)
  removeProfile(@Context('user') user: User) {
    try {
      return this.profileService.remove(user.id, user.email.split('@')[0]);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
