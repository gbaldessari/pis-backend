import { 
    Column, 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Job } from "./job.entity";
import { User } from "src/modules/users/entities/user.entity";

@Entity({ name: "reviews" })
@ObjectType()
export class Review {

    @PrimaryGeneratedColumn({ unsigned: true })
    @Field((type) => Int)
    id: number;

    @Column({ nullable: false })
    @Field()
    comment: string;

    @Column({ nullable: false })
    @Field()
    rate: number;

    @ManyToOne(() => Job, job => job.reviews)
    @Field(type => Job)
    job: Job;

    @ManyToOne(() => User, user => user.reviews)
    @Field(type => User)
    user: User;
}