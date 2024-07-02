import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateJobInput{

  @Field({nullable: true})
  jobName?: string;

  @Field({nullable: true})
  description?: string;

  @Field({nullable: true})
  idCategory?: number;

  @Field({nullable: true})
  requestsCount?: number;

  @Field({nullable: true})
  price?: number;
}