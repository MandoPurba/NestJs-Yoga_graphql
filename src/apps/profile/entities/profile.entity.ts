import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BaseEntity } from '../../../resource/base.entity';
import { UserEntity } from '../../user/entities/user.entity';

@ObjectType()
export class Profile extends BaseEntity {
  @Field(() => ID, { description: 'ID', nullable: true })
  id: number;

  @Field(() => String, { description: 'First Name', nullable: true })
  firstName: string;

  @Field(() => String, { description: 'Last Name', nullable: true })
  lastName: string;

  @Field(() => String, { description: 'Gender', nullable: true })
  gender: string;

  @Field(() => UserEntity, { nullable: true })
  user: UserEntity;
}
