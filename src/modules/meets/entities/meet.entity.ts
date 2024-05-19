import { Field, ObjectType, Int } from "@nestjs/graphql";
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    JoinColumn, 
    ManyToOne
} from "typeorm";
import { User } from "src/modules/users/entities/user.entity";
import { Job } from "src/modules/jobs/entities/job.entity";

@Entity({ name: "meets" })
@ObjectType()
export class Meet {

    @PrimaryGeneratedColumn({ unsigned: true })
    @Field((type) => Int)
    id:number;

    @ManyToOne(() => Job, job => job.meets)
    @JoinColumn({ name: "idJob" })
    @Field(type => Job, {nullable: false})
    idJob:Job;

    @ManyToOne(() => User, user => user.professionalMeets)
    @JoinColumn({ name: "idProfessional" })
    @Field(type => User, {nullable: false})
    idProfessional:User;

    @ManyToOne(() => User, user => user.userMeets)
    @JoinColumn({ name: "idUsuario" })
    @Field(type => User, {nullable: false})
    idUser:User;

    @Column({type: 'date', nullable: false})
    @Field()
    meetDate:string;

    @Column({type: 'time', nullable: false})
    @Field()
    startTime:string;

    @Column({type: 'time', nullable: true})
    @Field()
    endTime:string;

}