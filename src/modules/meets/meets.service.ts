import { Injectable } from '@nestjs/common';
import { CreateMeetInput } from './dto/create-meet.input';
import { UpdateMeetInput } from './dto/update-meet.input';

@Injectable()
export class MeetsService {
  create(createMeetInput: CreateMeetInput) {
    return 'This action adds a new meet';
  }

  findAll() {
    return `This action returns all meets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meet`;
  }

  update(id: number, updateMeetInput: UpdateMeetInput) {
    return `This action updates a #${id} meet`;
  }

  remove(id: number) {
    return `This action removes a #${id} meet`;
  }
}
