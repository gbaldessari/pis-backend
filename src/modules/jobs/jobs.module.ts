import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { CategoryModule } from './category/category.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    UsersModule,
    CategoryModule
  ],
  providers: [JobsResolver, JobsService],
})
export class JobsModule {}
