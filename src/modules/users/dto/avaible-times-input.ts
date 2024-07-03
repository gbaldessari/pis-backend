import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AvaibleTimesInput {

    @Field({
        nullable: false,
        description: 'Id of the professional'
    })
    idProfessional: number;
    
    @Field({
        nullable: false,
        description: 'Date of the avaible time'
    })
    date: string;
}