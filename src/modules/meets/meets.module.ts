import { Module } from '@nestjs/common';
import { MeetsService } from './meets.service';
import { MeetsResolver } from './meets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meet } from './entities/meet.entity';
import { UsersModule } from '../users/users.module';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meet]),
    UsersModule,
    JobsModule
  ],
  providers: [MeetsResolver, MeetsService],
  exports: [MeetsService]
})
export class MeetsModule {}
