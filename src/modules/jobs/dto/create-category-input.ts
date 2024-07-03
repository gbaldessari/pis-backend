import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCategoryInput {
    
    @Field({nullable: false, description: 'Name of the category'})
    name: string;
}