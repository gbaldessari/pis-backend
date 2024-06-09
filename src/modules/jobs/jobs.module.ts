import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { CategoryModule } from './category/category.module';
import { UsersModule } from '../users/users.module';
import { Category } from './entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job, Category]),
    UsersModule,
    CategoryModule
  ],
  providers: [JobsResolver, JobsService],
  exports: [JobsService]
})
export class JobsModule {}
