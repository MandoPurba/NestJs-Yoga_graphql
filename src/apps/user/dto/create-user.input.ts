import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

registerEnumType(Role, {
  name: 'Role',
});

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Email', nullable: false })
  email: string;

  @Field(() => String, { description: 'password', nullable: false })
  password: string;

  @Field(() => Role, { description: 'role', nullable: false })
  role: Role;
}
