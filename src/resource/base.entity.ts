import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BaseEntity {
  @Field(() => String, { nullable: true })
  createdBy: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedBy: string;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  deletedBy: string;

  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}
