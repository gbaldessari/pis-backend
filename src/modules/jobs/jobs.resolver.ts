import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JobsService } from './jobs.service';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';

@Resolver('Job')
export class JobsResolver {
  constructor(
    private jobsService: JobsService
  ) {}

  @Query('jobs')
  getJobs() {
    return this.jobsService.getJobs();
  }

  @Query('jobByName')
  getByName(@Args('name') jobName: string) {
    return this.jobsService.getByName(jobName);
  }

  @Query('jobByCategory')
  getByCategory(@Args('category') categoryName: string) {
    return this.jobsService.getByCategory(categoryName);
  }

  @Mutation('createJob')
  createJob(@Args('createJobInput') createJobInput: CreateJobInput) {
    return this.jobsService.createJob(createJobInput);
  }

  @Mutation('updateJob')
  updateJob(@Args('updateJobInput') updateJobInput: UpdateJobInput) {
    return this.jobsService.updateJob(updateJobInput.jobName, updateJobInput);
  }

  @Mutation('removeJob')
  removeJob(@Args('id') id: number) {
    return this.jobsService.removeJob(id);
  }
}
