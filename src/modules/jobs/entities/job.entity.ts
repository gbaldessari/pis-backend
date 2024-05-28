import { Field, ObjectType, Int } from "@nestjs/graphql";
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    JoinColumn, 
    ManyToOne,
    OneToMany
} from "typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { Category } from "./category.entity";
import { Meet } from "src/modules/meets/entities/meet.entity";
import { Review } from "./review.entity";

@Entity({ name: "jobs" })
@ObjectType()
export class Job {

    @PrimaryGeneratedColumn({ unsigned: true })
    @Field((type) => Int)
    id:number;

    @Column({nullable: false, unique: true})
    @Field()
    jobName:string;

    @Column({unique: true, nullable: false})
    @Field()
    description:string;

    @Column({nullable: false})
    @Field()
    price:number;

    @Column({default: 0, nullable: true})
    @Field()
    averageRate:number;

    @ManyToOne(() => Category, category => category.jobs)
    @JoinColumn({ name: "idCategory" })
    @Field(type => Category, {nullable: false})
    idCategory:Category;

    @ManyToOne(() => User, user => user.jobs)
    @JoinColumn({ name: "idProfessional" })
    @Field(type => User, {nullable: false})
    idProfessional:User;

    @Column({default: 0, nullable: true})
    @Field()
    requestsCount:number;

    @OneToMany(() => Meet, meet => meet.idJob)
    meets: Meet[];

    @OneToMany(() => Review, review => review.job)
    reviews: Review[];

}
