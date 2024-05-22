import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MeetsService } from './meets.service';
import { CreateMeetInput } from './dto/create-meet.input';
import { UpdateMeetInput } from './dto/update-meet.input';

@Resolver('Meet')
export class MeetsResolver {
  constructor(
    private readonly meetsService: MeetsService
  ) {}
  
  @Query('meets')
  async getMeets() {
    return await this.meetsService.getMeets();
  }

  @Mutation('createMeet')
  async createMeet(@Args('createMeetInput') createMeetInput: CreateMeetInput) {
    return await this.meetsService.createMeet(createMeetInput);
  }
  
  @Mutation('finishMeet')
  async finishMeet(@Args('id') id: number) {
    return await this.meetsService.finishMeet(id);
  }

  @Query('meet')
  findOne(@Args('id') id: number) {
    return this.meetsService.findOne(id);
  }

  @Mutation('updateMeet')
  update(@Args('updateMeetInput') updateMeetInput: UpdateMeetInput) {
    return this.meetsService.update(updateMeetInput.id, updateMeetInput);
  }

  @Mutation('removeMeet')
  remove(@Args('id') id: number) {
    return this.meetsService.remove(id);
  }
}
