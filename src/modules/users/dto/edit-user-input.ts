import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class EditUserInput {

    @Field({nullable: true})
    username?: string;

    @Field({nullable: true})
    phone?: number;

    @Field({nullable: true})
    address?: string;

    @Field({nullable: true})
    password?: string;

    @Field({nullable: true})
    resetPasswordToken?: string;
}
