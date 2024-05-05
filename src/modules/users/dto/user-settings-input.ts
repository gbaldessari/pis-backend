import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserSettingsInput {
    
    @Field((type) => Int)
    userID: number;

    @Field({defaultValue: false, nullable: true})
    receiveNotifications: boolean;

    @Field({defaultValue: false, nullable: true})
    receiveEmails: boolean;

}