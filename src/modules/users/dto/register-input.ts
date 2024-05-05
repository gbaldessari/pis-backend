import { Field, InputType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class RegisterInput {

    @Field()
    username: string;
    
    @IsEmail()
    @Field()
    email: string;
    
    @Field()
    password: string;

    @Field()
    phone:number;

    @Field()
    address:string;

}