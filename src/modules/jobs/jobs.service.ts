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
    return await this.jobRepository.find();
  }

  async getByName(jobName: string) {
    return await this.jobRepository.findOne({where: {jobName: jobName}});
  }

  async getByCategory(categoryName: string) {
    const category: Category = await this.categoryService.getByName(categoryName);

    return await this.jobRepository.find({
      where: { 
        idCategory: category.id
      },
      relations: ['category']
    });
  }

  async createJob(createJobInput: CreateJobInput) {
    const existName = await this.getByName(createJobInput.jobName);
    const category = await this.categoryService.getById(createJobInput.idCategory);
    const existCategory =  (await this.getByCategory(category.categoryName)).find(
        existName => existName.jobName === createJobInput.jobName
      );
    const professional = await this.userService.getUserById(
      createJobInput.idProfessional);

    if(existName) throw new Error('Este nombre ya fue utilizado');
    if(!category) throw new Error('Categoria no existe');
    if(!professional) throw new Error('Profesional no registrado');
    if(existCategory === existName) 
      throw new Error('Ya existe un servicio con este nombre en la categoría: '+
      category.categoryName);

    let job: Job;

    await this.connection.transaction(
      async (transactionalEntityManager: EntityManager): Promise<void> => {
        try {
          job = this.jobRepository.create(createJobInput);
          await transactionalEntityManager.save(job);
        } catch (error: unknown) {
          throw new Error(HttpStatus.INTERNAL_SERVER_ERROR.toString());
        }
      },
    );
    return {job: job, message: "Servicio creado"}
  }

  async updateJob(jobName: string, updateJobInput: UpdateJobInput) {
    const job: Job = await this.getByName(jobName);

    if (!job) throw new Error('Servicio no encontrado');

    const existName = await this.getByName(updateJobInput.jobName);
    const category = await this.categoryService.getById(updateJobInput.idCategory);
    const existCategory =  (await this.getByCategory(category.categoryName)).find(
        existName => existName.jobName === updateJobInput.jobName
      );
    const professional = await this.userService.getUserById(
      updateJobInput.idProfessional);

    if(existName) throw new Error('Este nombre ya fue utilizado');
    if(!category) throw new Error('Categoria no existe');
    if(!professional) throw new Error('Profesional no registrado');
    if(existCategory === existName) 
      throw new Error('Ya existe un servicio con este nombre en la categoría: '+
      category.categoryName);

    const updateJob: Job = await this.jobRepository.save({
      ...job,
      ...updateJobInput
    });

    return {job: updateJob, message: "Servicio actualizado"};
  }

  async removeJob(id: number) {
    const job = await this.jobRepository.findOneBy({id});
    if (!job) throw new Error('Trabajo no encontrado');

    await this.jobRepository.remove(job);

    return {message: "Servicio eliminado"};
  }
}
