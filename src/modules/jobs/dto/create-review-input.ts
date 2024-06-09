import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateReviewInput {

    @Field()
    comment: string;

    @Field()
    rate: number;

    @Field()
    idJob: number;
}