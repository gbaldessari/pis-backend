
import { Field, ObjectType, Int } from "@nestjs/graphql";
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    JoinColumn, 
    ManyToOne
} from "typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { Category } from "./category.entity";

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

    @Column({default: 0, nullable: true})
    @Field()
    averageRate:number;

    @ManyToOne(() => Category, category => category.id)
    @JoinColumn({ name: "idCategory" })
    @Field({nullable: false})
    idCategory:number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: "idProfessional" })
    @Field({nullable: false})
    idProfessional:number;

    @Column({default: 0, nullable: true})
    @Field()
    requestsCount:number;

}
