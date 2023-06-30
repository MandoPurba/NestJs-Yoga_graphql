import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity, UserInterface } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import * as argon from 'argon2';
import { AuthGuard } from '../../auth/guard';

@UseGuards(AuthGuard)
@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => String)
  async createUsers(
    @Args('users', { type: () => [CreateUserInput] }) users: CreateUserInput[],
    @Context('user') session: User,
  ) {
    try {
      let data: UserInterface;
      const datas = [];
      for (const user of users) {
        const [password, createdBy] = [
          await argon.hash(user.password),
          session.email.split('@')[0],
        ];
        data = {
          email: user.email,
          password,
          role: user.role,
          createdBy,
          createdAt: new Date(),
        };
        datas.push(data);
      }
      const final = await this.userService.createMany(datas);
      return `${final.count} telah di tambahkan`;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Mutation(() => UserEntity)
  async createUser(
    @Args('user', { type: () => CreateUserInput }) user: CreateUserInput,
    @Context('user') session: User,
  ) {
    try {
      const password = await argon.hash(user.password);
      const data: UserInterface = {
        email: user.email,
        password,
        role: user.role,
        createdBy: session.email.split('@')[0],
        createdAt: new Date(),
      };
      return await this.userService.create(data);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Query(() => [UserEntity], { name: 'users' })
  findAll() {
    try {
      return this.userService.findAll();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Query(() => UserEntity, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return this.userService.findOne(id);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Mutation(() => UserEntity)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context('user') session: User,
  ) {
    try {
      return this.userService.update(
        updateUserInput.id,
        session.email.split('@')[0],
        updateUserInput,
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Mutation(() => UserEntity)
  removeUser(
    @Args('id', { type: () => String }) id: string,
    @Context('user') session: User,
  ) {
    try {
      return this.userService.remove(id, session.email.split('@')[0]);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
