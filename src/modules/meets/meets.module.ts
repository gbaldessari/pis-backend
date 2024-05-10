import { Module } from '@nestjs/common';
import { MeetsService } from './meets.service';
import { MeetsResolver } from './meets.resolver';

@Module({
  providers: [MeetsResolver, MeetsService],
})
export class MeetsModule {}
