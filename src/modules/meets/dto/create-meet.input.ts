import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMeetInput {
    
    @Field()
    idJob: number;

    @Field()
    meetDate:string;

    @Field()
    startTime:string;

    @Field()
    endTime:string;

}
