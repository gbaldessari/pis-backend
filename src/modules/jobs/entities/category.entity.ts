import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity({ name: "categories" })
@ObjectType()
export class Category {

    @PrimaryGeneratedColumn({ unsigned: true })
    @Field((type) => Int)
    id:number;

    @Column({nullable: false, unique: true})
    @Field()
    categoryName:string;

    @OneToMany(() => Job, job => job.idCategory)
    jobs: Job[]; 

}   