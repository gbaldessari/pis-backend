import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "user_settings" })
@ObjectType()
export class UserSetting {

    @PrimaryColumn()
    @Field(type => Int)
    userID: number;
    
    @Column({ default: false })
    @Field({defaultValue: false, nullable: true})
    receiveEmails: boolean;

    @Column({ default: false })
    @Field({defaultValue: false, nullable: true})
    receiveNotifications: boolean;

}