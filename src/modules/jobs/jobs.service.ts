import { Injectable } from '@nestjs/common';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Connection, EntityManager, Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { CategoryService } from './category/category.service';
import { UserService } from '../users/users.service';
import { Category } from './entities/category.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    private categoryService: CategoryService,
    private userService: UserService,
    private connection: Connection,
  ){}

  async getJobs() {
    try {
      return await this.jobRepository.find({
        relations: [
          "idProfessional", 
          "idCategory"
        ]
      });
    } catch (e) {
      return null;
    }
  }

  async getByName(jobName: string) {
    try {
      return {
        data: await this.jobRepository.findOne(
          {
            where: {jobName}, 
            relations: ['idProfessional', 'idCategory']
          }
        ),
        success: true
      } 
    } catch (e) {
      return {
        data: null,
        success: false
      }
    }
  }

  async getById(id: number) {
    try {
      return {
        data: await this.jobRepository.findOne
        ({
          where: {id}, relations: ["idProfessional", "idCategory"] 
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

  async getByCategory(categoryName: string) {
    const category: Category = (await this.categoryService
      .getByName(categoryName)).data;

    if (!category) return {
      data: null,
      message: 'Categoria no encontrada',
      success: false
    }

    try {
      return {
        data: await this.jobRepository.find({
          where: { 
            idCategory: category
          },
          relations: ['idProfessional', 'idCategory']
        }),
        message: 'Servicios encontrados',
        success: true
      } 
    } catch (e) {
      return {
        data: null,
        message: 'Error al buscar servicios',
        success: false
      }
    }
  }

  async createJob(id: number, createJobInput: CreateJobInput) {
    const existName = (
      await this.getByName(createJobInput.jobName)
    ).data;

    const category = (
      await this.categoryService.getById(createJobInput.idCategory)
    ).data;

    const existCategory = (
      await this.getByCategory(category.categoryName)
    ).data.find(
      job => job.jobName === createJobInput.jobName);

    const professional = (await this.userService.getUserById(id)).data;

    if(!professional || !professional.isProfessional) return {
      data: null,
      message: 'Usuario no autorizado',
      success: false
    };
    if(existName) return {
      data: null,
      message: 'Ya existe un servicio con este nombre',
      success: false
    };
    if(!category) return {
      data: null,
      message: 'Categoria no existe',
      success: false
    };
    if(existCategory === existName) return {
      data: null,
      message: 'Ya existe un servicio con este nombre en la categoría: '+
      category.categoryName,
      success: false
    };
    
    const jobInput = {
      jobName: createJobInput.jobName,
      description: createJobInput.description,
      idCategory: category,
      idProfessional: professional,
      price: createJobInput.price
    };

    let job: Job;
    await this.connection.transaction(
      async (transactionalEntityManager: EntityManager): Promise<void> => {
        try {
          job = this.jobRepository.create(jobInput);
          await transactionalEntityManager.save(job);
        } catch (error: unknown) {
          throw new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
      },
    );

    return { 
      data: job.jobName, 
      message: 'Servicio creado', 
      success: true
    }
  }

  async updateJob(
    id: number, 
    jobName: string, 
    updateJobInput: UpdateJobInput
  ) {
    const job: Job = (
      await this.getByName(jobName)
    ).data;

    if (!job) return {
      data: null,
      message: 'Servicio no encontrado',
      success: false
    }

    const existName = (
      await this.getByName(updateJobInput.jobName)
    ).data;

    const category = (
      await this.categoryService.getById(updateJobInput.idCategory)
    ).data;

    const existCategory =  (
      await this.getByCategory(category.categoryName)
    ).data.find(
      existName => existName.jobName === updateJobInput.jobName
    );

    const professional = (
      await this.userService.getUserById(id)
    ).data;

    if(!category) return {
      data: null,
      message: 'Categoria no existe',
      success: false
    }
    if(!professional) return {
      data: null,
      message: 'Profesional no registrado',
      success: false
    }
    if(existCategory === existName) return {
      data: null,
      message: 'Ya existe un servicio con este nombre en la categoría: '+
      category.categoryName,
      success: false
    }

    const updateInput: Job = await this.jobRepository.save
    ({
      ...job, ...updateJobInput,
      idCategory: category ? category : job.idCategory,
    });

    return {
      data: updateInput.jobName,
      message: 'Servicio actualizado',
      success: true
    };
  }

  async removeJob(id: number) {
    const job = await this.jobRepository.findOneBy({id});
    if (!job) return {
      message: 'Servicio no encontrado',
      success: false
    }

    await this.jobRepository.remove(job);
    return {
      message: 'Servicio eliminado',
      success: true
    };
  }

  async getReviews(id: number) {
    const job: Job = await this.jobRepository.findOne(
      {where: {id: id}, relations: [
        'reviews',
        'reviews.user',
        'reviews.job',
        'reviews.job.idProfessional',
        'reviews.job.idCategory'
      ]}
    )

    if (!job) return {
      data: [],
      message: 'Servicio no encontrado',
      success: false
    }

    if(!job.reviews) return {
      data: [],
      message: 'No hay reseñas',
      success: false
    }

    return {
      data: job.reviews,
      message: 'Reseñas encontradas',
      success: true
    }
  }

  async mostRequestedJobs() {
    const mostRequestedJobs: Job[] = await this.jobRepository.find({
      order: {requestsCount: 'DESC'},
      relations: ['idProfessional', 'idCategory']
    });

    if (!mostRequestedJobs) return {
      data: [],
      message: 'No hay servicios',
      success: false
    }

    return {
      data: mostRequestedJobs,
      message: 'Servicios mas solicitados',
      success: true
    }
  }

}
