import { Field, InputType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class ResetUserInput {

    @IsEmail()
    @Field()
    email: string;

    @Field()
    username: string;

    @Field()
    resetPasswordToken: string;
    
}