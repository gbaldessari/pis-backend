import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AvaibleTimesInput {

    @Field()
    idProfessional: number;
    
    @Field()
    date: string;
}