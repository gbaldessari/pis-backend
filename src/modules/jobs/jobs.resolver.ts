import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { JobsService } from './jobs.service';
import { CreateJobInput } from './dto/create-job.input';
import { UpdateJobInput } from './dto/update-job.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../users/guard/auth.guard';

@Resolver('Job')
export class JobsResolver {
  constructor(
    private jobsService: JobsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query('jobs')
  async getJobs() {
    try {
      return await this.jobsService.getJobs();
    } catch (e) {
      throw new Error("INTERNAL_SERVER_ERROR" + e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query('jobByName')
  async getByName(@Args('name') jobName: string) {
    try {
      return await this.jobsService.getByName(jobName);
    } catch (e) {
      throw new Error("INTERNAL_SERVER_ERROR" + e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query('jobByCategory')
  async getByCategory(@Args('category') categoryName: string) {
    try {
      return await this.jobsService.getByCategory(categoryName);
    } catch (e) {
      throw new Error("INTERNAL_SERVER_ERROR" + e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query('jobById')
  async getById(@Args('id') id: number) {
    try {
      return await this.jobsService.getById(id);
    } catch (e) {
      throw new Error("INTERNAL_SERVER_ERROR" + e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query('getReviewsByJob')
  async getReviewsByJob(@Args('id') id: number) {
    try {
      return await this.jobsService.getReviews(id);
    } catch (e) {
      throw new Error("INTERNAL_SERVER_ERROR" + e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('createJob')
  async createJob(
    @Context() context: any,
    @Args('createJobInput') createJobInput: CreateJobInput
  ) {
    try {
      const id: number = context.req.user.id;
      return await this.jobsService.createJob(id, createJobInput);
    } catch (e) {
      throw new Error("INTERNAL_SERVER_ERROR" + e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('updateJob')
  async updateJob(
    @Context() context: any,
    @Args('jobName') jobName: string, 
    @Args('updateJobInput') updateJobInput: UpdateJobInput
  ) {
    try {
      const id: number = context.req.user.id;
      return await this.jobsService.updateJob(id, jobName, updateJobInput);
    } catch (e) {
      throw new Error("INTERNAL_SERVER_ERROR" + e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('removeJob')
  async removeJob(@Args('id') id: number) {
    try {
      return await this.jobsService.removeJob(id);
    } catch (e) {
      throw new Error("INTERNAL_SERVER_ERROR" + e);
    }
  }
}
