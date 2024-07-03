import { Field, InputType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class RegisterInput {

    @Field({
        nullable: false,
        description: 'Username of the user'
    })
    username: string;
    
    @IsEmail()
    @Field({
        nullable: false,
        description: 'Email of the user'
    })
    email: string;
    
    @Field({
        nullable: false,
        description: 'Password of the user'
    })
    password: string;

    @Field({
        nullable: false,
        description: 'Phone of the user'
    })
    phone:number;

    @Field({
        nullable: false,
        description: 'Address of the user'
    })
    address:string;

}