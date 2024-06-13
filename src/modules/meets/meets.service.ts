import { Injectable } from '@nestjs/common';
import { CreateMeetInput } from './dto/create-meet.input';
import { Meet } from './entities/meet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, EntityManager } from 'typeorm';
import { UserService } from '../users/users.service';
import { JobsService } from '../jobs/jobs.service';
import { Job } from '../jobs/entities/job.entity';
import { User } from '../users/entities/user.entity';
import { HttpStatus } from '@nestjs/common';
import { UpdateJobInput } from '../jobs/dto/update-job.input';

@Injectable()
export class MeetsService {
  constructor(
    @InjectRepository(Meet)
    private meetRepository: Repository<Meet>,
    private userService: UserService,
    private jobSrevice: JobsService,
    private connection: Connection,
  ) {}

  async getById(id: number) {
    try {
      return {
        data: await this.meetRepository.
          findOne({
            where: {id},
            relations: ['idProfessional', 'idUser']
          }),
        success: true
      }
    } catch (e) {
      return {
        data: null,
        success: false
      }
    }
  }

  async createMeet(id: number, createMeetInput: CreateMeetInput) {
    const job: Job = (
      await this.jobSrevice.getById(createMeetInput.idJob)
    ).data;

    if(!job) return {
      data: null,
      message: 'Servicio no encontrado',
      success: false
    }

    const professional: User = (
      await this.userService.getUserById(job.idProfessional.id)
    ).data;

    if(!professional) return {
      data: null,
      message: 'Profesional no encontrado',
      success: false
    }

    const client: User = (
      await this.userService.getUserById(id)
    ).data;

    if(!client) return {
      data: null,
      message: 'Usuario no encontrado',
      success: false
    }

    if(client.id === professional.id) return {
      data: null,
      message: 'No puedes agendar una cita contigo mismo',
      success: false
    }

    const confDateProffesional = await this.userService
    .getUserMeetByDate(
      professional.id, createMeetInput.meetDate
    );

    if(!confDateProffesional.success) return {
      data: null,
      message: 'El profesional ya tiene una cita en esa fecha',
      success: false
    }

    const confDateUser = await this.userService.getUserMeetByDate(
      client.id, createMeetInput.meetDate);


    if(!confDateUser.success) return {
      data: null,
      message: 'El usuario ya tiene una cita en esa fecha',
      success: false
    }

    const meetInput = {
      idJob: job,
      idProfessional: professional,
      idUser: client,
      meetDate: createMeetInput.meetDate,
      startTime: createMeetInput.startTime,
      endTime: createMeetInput.endTime
    }

    let meet: Meet;
    await this.connection.transaction(
      async (transactionalEntityManager: EntityManager): Promise<void> => {
        try {
          meet = this.meetRepository.create(meetInput);
          await transactionalEntityManager.save(meet);
        } catch (error: unknown) {
          throw new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
      },
    );
    
    return {
      data: meet,
      message: 'Cita registrada',
      success: true
    };
  }

  async finishMeet(idProfessional: number, idMeet: number) {
    const meet: Meet = await this.meetRepository.
    findOne({
      where: {id: idMeet}, 
      relations: [
        'idJob', 
        'idProfessional', 
        'idUser', 
        'idJob.idProfessional', 
        'idJob.idCategory'
      ]
    });

    if(!meet) return {
      data: null,
      message: 'Cita no encontrada',
      success: false
    }

    if(meet.isDone) return {
      data: null,
      message: 'Cita ya finalizada',
      success: false
    }

    const meetUpdated: Meet = {
      ...meet,
      isDone: true
    };

    const meetRet = await this.meetRepository.save(meetUpdated);
    const newRequestCount = meet.idJob.requestsCount + 1;
    const updateInput: UpdateJobInput = {
      requestsCount: newRequestCount
    }

    await this.jobSrevice.updateJob(
      idProfessional, meet.idJob.jobName, updateInput
    );

    return {
      data: meetRet,
      message: 'Cita finalizada',
      success: true
    }
  }

  async getMeets() {
    return await this.meetRepository.find();
  }

  async getMeetById(id: number) {
    try {
      return {
        data: await this.meetRepository.findOneBy({id}),
        success: true
      }
    } catch (e) {
      return {
        data: null,
        success: false
      }
    }
  }

  async removeMeet(id: number) {
    const meet: Meet = (
      await this.getMeetById(id)
    ).data;
    
    if (!meet) return {
      message: 'Reunion no encontrada',
      success: false
    }

    await this.meetRepository.remove(meet);
    return {
      message: 'Reunion eliminada',
      success: true
    };
  }
}
