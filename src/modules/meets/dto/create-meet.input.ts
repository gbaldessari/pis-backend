import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMeetInput {
    
    @Field({nullable: false, description: 'Id of the job'})
    idJob: number;

    @Field({nullable: false, description: 'Date of the meet'})
    meetDate:string;

    @Field({nullable: false, description: 'Start time of the meet'})
    startTime:string;

    @Field({nullable: false, description: 'End time of the meet'})
    endTime:string;

}
