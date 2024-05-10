import { Field, ObjectType, Int } from "@nestjs/graphql";
import { UserSetting } from "./user-settings.entity";
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    OneToOne, 
    JoinColumn, 
    OneToMany
} from "typeorm";
import { Job } from "src/modules/jobs/entities/job.entity";

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

    @Column({nullable: true})
    @Field()
    resetPasswordToken:string;

    @Column({nullable: true})
    @Field()
    resetPasswordExpires:Date;

    @OneToMany(() => Job, job => job.idProfessional)
    jobs: Job[];

    @OneToOne(() => UserSetting)
    @JoinColumn()
    @Field({nullable: true})
    settings?: UserSetting;

}