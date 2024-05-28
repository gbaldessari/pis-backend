import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MeetsService } from './meets.service';
import { CreateMeetInput } from './dto/create-meet.input';

@Resolver('Meet')
export class MeetsResolver {
  constructor(
    private readonly meetsService: MeetsService
  ) {}
  
  @Query('meets')
  async getMeets() {
    return await this.meetsService.getMeets();
  }
  
  @Query('meet')
  async getMeetById(@Args('id') id: number) {
    return this.meetsService.getMeetById(id);
  }

  @Mutation('createMeet')
  async createMeet(@Args('createMeetInput') createMeetInput: CreateMeetInput) {
    return await this.meetsService.createMeet(createMeetInput);
  }
  
  @Mutation('finishMeet')
  async finishMeet(@Args('id') id: number) {
    return await this.meetsService.finishMeet(id);
  }

  @Mutation('removeMeet')
  async removeMeet(@Args('id') id: number) {
    return this.meetsService.removeMeet(id);
  }
}
