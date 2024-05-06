import { Field, InputType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class ResetPasswordInput {

    @IsEmail()
    @Field()
    email: string;

    @Field()
    resetPasswordToken: string;
    
    @Field()
    password: string;
}