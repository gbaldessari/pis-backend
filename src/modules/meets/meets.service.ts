import { Injectable } from '@nestjs/common';
import { CreateMeetInput } from './dto/create-meet.input';
import { UpdateMeetInput } from './dto/update-meet.input';
import { Meet } from './entities/meet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, EntityManager } from 'typeorm';
import { UserService } from '../users/users.service';
import { JobsService } from '../jobs/jobs.service';
import { Job } from '../jobs/entities/job.entity';
import { User } from '../users/entities/user.entity';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class MeetsService {
  constructor(
    @InjectRepository(Meet)
    private meetRepository: Repository<Meet>,
    private userService: UserService,
    private jobSrevice: JobsService,
    private connection: Connection,
  ) {}

  async createMeet(createMeetInput: CreateMeetInput) {
    const job: Job = (await this.jobSrevice.getById(createMeetInput.idJob)).data;
    if(!job) return {
      data: null,
      message: 'Servicio no encontrado',
      success: false
    }

    const professional: User = (await this.userService.getUserById(createMeetInput.idProfessional)).data;
    if(!professional) return {
      data: null,
      message: 'Profesional no encontrado',
      success: false
    }

    const client: User = (await this.userService.getUserById(createMeetInput.idUser)).data;
    if(!client) return {
      data: null,
      message: 'Usuario no encontrado',
      success: false
    }

    if(job.idProfessional !== professional) return {
      data: null,
      message: 'El profesional no ofrece el servicio seleccionado',
      success: false
    }

    const confDateProffesional = await this.userService.getUserMeetByDate(
      professional.id, createMeetInput.meetDate);
    if(confDateProffesional) return {
      data: null,
      message: 'El profesional ya tiene una cita en esa fecha',
      success: false
    }

    const confDateUser = await this.userService.getUserMeetByDate(
      client.id, createMeetInput.meetDate);
    if(confDateUser) return {
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

  findAll() {
    return this.meetRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} meet`;
  }

  update(id: number, updateMeetInput: UpdateMeetInput) {
    return `This action updates a #${id} meet`;
  }

  remove(id: number) {
    return `This action removes a #${id} meet`;
  }
}
