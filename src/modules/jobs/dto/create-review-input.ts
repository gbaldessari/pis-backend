import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateReviewInput {

    @Field({nullable: false, description: 'Comment of the review'})
    comment: string;

    @Field({nullable: false, description: 'Rate of the review'})
    rate: number;

    @Field({nullable: false, description: 'Id of the job'})
    idJob: number;
}