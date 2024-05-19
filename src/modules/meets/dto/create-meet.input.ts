import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMeetInput {
    
    @Field()
    idJob: number;
    
    @Field()
    idProfessional: number;

    @Field()
    idUser:number;

    @Field()
    meetDate:string;

    @Field()
    startTime:string;

    @Field()
    endTime:string;

}
