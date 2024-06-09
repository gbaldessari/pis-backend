import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MeetsService } from './meets.service';
import { CreateMeetInput } from './dto/create-meet.input';
import { Context } from '@nestjs/graphql';
import { JwtAuthGuard } from '../users/guard/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('Meet')
export class MeetsResolver {
  constructor(
    private readonly meetsService: MeetsService
  ) {}
  
  @UseGuards(JwtAuthGuard)
  @Query('meets')
  async getMeets() {
    try {
      return await this.meetsService.getMeets();
    } catch (e) {
      throw new Error("INTERNAL_SERVER_ERROR" + e);
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Query('meet')
  async getMeetById(@Args('id') id: number) {
    try {
      return await this.meetsService.getMeetById(id);
    } catch (e) {
      throw new Error("INTERNAL_SERVER_ERROR" + e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('createMeet')
  async createMeet(
    @Context() context: any,
    @Args('createMeetInput') createMeetInput: CreateMeetInput
  ) {
    try {
      const id: number = context.req.user.id;
      return await this.meetsService.createMeet(id, createMeetInput);
    } catch (e) {
      throw new Error("INTERNAL_SERVER_ERROR" + e);
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Mutation('finishMeet')
  async finishMeet(
    @Context() context: any,
    @Args('idMeet') idMeet: number
  ) {
    try {
      const idProfessional: number = context.req.user.id;
      return await this.meetsService.finishMeet(idProfessional, idMeet);
    } catch (e) {
      throw new Error("INTERNAL_SERVER_ERROR" + e);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('removeMeet')
  async removeMeet(@Args('id') id: number) {
    try {
      return await this.meetsService.removeMeet(id);
    } catch (e) {
      throw new Error("INTERNAL_SERVER_ERROR" + e);
    }
  }
}
