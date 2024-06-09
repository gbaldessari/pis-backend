import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateJobInput {
    
    @Field()
    jobName: string;
    
    @Field()
    description: string;

    @Field()
    idCategory: number;

    @Field()
    price: number;

}



