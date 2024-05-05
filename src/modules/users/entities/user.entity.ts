import { Field, ObjectType, Int } from "@nestjs/graphql";
import { UserSetting } from "./user-settings.entity";
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    OneToOne, 
    JoinColumn 
} from "typeorm";

@Entity({ name: "users" })
@ObjectType()
export class User {
    
    @PrimaryGeneratedColumn({ unsigned: true })
    @Field((type) => Int)
    id:number;

    @Column({nullable: false})
    @Field()
    username:string;

    @Column({unique: true, nullable: false})
    @Field()
    email:string;

    @Column({nullable: false})
    @Field()
    password:string;

    @Column({nullable: false})
    @Field()
    phone:number;

    @Column({nullable: false})
    @Field()
    address:string;

    @OneToOne(() => UserSetting)
    @JoinColumn()
    @Field({nullable: true})
    settings?: UserSetting;

}