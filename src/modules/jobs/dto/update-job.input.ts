import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateJobInput{

  @Field({nullable: true, description: 'Name of the job'})
  jobName?: string;

  @Field({nullable: true, description: 'Description of the job'})
  description?: string;

  @Field({nullable: true, description: 'Category of the job'})
  idCategory?: number;

  @Field({nullable: true, description: 'Requests count of the job'})
  requestsCount?: number;

  @Field({nullable: true, description: 'Average rate of the job'})
  averageRate?: number;

  @Field({nullable: true, description: 'Price of the job'})
  price?: number;
}