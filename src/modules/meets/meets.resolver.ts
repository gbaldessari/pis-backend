import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MeetsService } from './meets.service';
import { CreateMeetInput } from './dto/create-meet.input';
import { UpdateMeetInput } from './dto/update-meet.input';

@Resolver('Meet')
export class MeetsResolver {
  constructor(private readonly meetsService: MeetsService) {}

  @Mutation('createMeet')
  create(@Args('createMeetInput') createMeetInput: CreateMeetInput) {
    return this.meetsService.create(createMeetInput);
  }

  @Query('meets')
  findAll() {
    return this.meetsService.findAll();
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
