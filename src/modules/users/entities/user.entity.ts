import { Field, ObjectType, Int } from "@nestjs/graphql";
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    OneToMany
} from "typeorm";
import { Job } from "src/modules/jobs/entities/job.entity";
import { Meet } from "src/modules/meets/entities/meet.entity";
import { Review } from "src/modules/jobs/entities/review.entity";

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

    @Column({default: false})
    @Field()
    isProfessional:boolean;

    @OneToMany(() => Job, job => job.idProfessional)
    jobs: Job[];

    @OneToMany(() => Meet, meet => meet.idProfessional)
    professionalMeets: Meet[];

    @OneToMany(() => Meet, meet => meet.idUser)
    userMeets: Meet[];

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];
}