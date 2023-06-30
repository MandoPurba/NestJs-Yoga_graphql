import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Gender } from '@prisma/client';

registerEnumType(Gender, {
  name: 'Gender',
});

@InputType()
export class CreateProfileInput {
  @Field(() => String, { description: 'First Name', nullable: false })
  firstName: string;

  @Field(() => String, { description: 'Last Name', nullable: false })
  lastName: string;

  @Field(() => Gender, { description: 'Gender', nullable: false })
  gender: Gender;
}
