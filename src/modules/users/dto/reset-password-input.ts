import { Field, InputType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class ResetPasswordInput {

    @IsEmail()
    @Field({
        nullable: false,
        description: 'Email of the user'
    })
    email: string;

    @Field({
        nullable: false,
        description: 'Reset password token'
    })
    resetPasswordToken: string;
    
    @Field({
        nullable: false,
        description: 'Password of the user'
    })
    password: string;
}