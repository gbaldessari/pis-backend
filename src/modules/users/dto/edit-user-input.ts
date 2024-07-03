import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class EditUserInput {

    @Field({nullable: true, description: 'Username of the user'})
    username?: string;

    @Field({nullable: true, description: 'Phone of the user'})
    phone?: number;

    @Field({nullable: true, description: 'Address of the user'})
    address?: string;

    @Field({nullable: true, description: 'Password of the user'})
    password?: string;

    @Field({nullable: true, description: 'Token to reset password of the user'})
    resetPasswordToken?: string;

    @Field({nullable: true, description: 'Is the user a professional'})
    isProfessional?: boolean;
}
