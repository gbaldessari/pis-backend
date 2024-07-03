import { Field, InputType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class LoginInput {

    @IsEmail()
    @Field({nullable: false, description: 'Email of the user'})
    email: string;
    
    @Field({nullable: false, description: 'Password of the user'})
    password: string;
}