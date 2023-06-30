import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BaseEntity } from '../../../resource/base.entity';
import { Profile } from '../../profile/entities/profile.entity';

@ObjectType()
export class UserEntity extends BaseEntity {
  @Field(() => ID, { description: 'ID', nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  role: string;

  @Field(() => Profile, { nullable: true })
  profile: Profile;
}

export class UserInterface {
  createdAt: Date;
  password: string;
  role: 'ADMIN' | 'USER';
  createdBy: string;
  email: string;
}
