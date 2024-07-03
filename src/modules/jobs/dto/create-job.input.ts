import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateJobInput {
    
    @Field({nullable: false, description: 'Name of the job'})
    jobName: string;
    
    @Field({nullable: false, description: 'Description of the job'})
    description: string;

    @Field({nullable: false, description: 'Category of the job'})
    idCategory: number;

    @Field({nullable: false, description: 'Price of the job'})
    price: number;

}



