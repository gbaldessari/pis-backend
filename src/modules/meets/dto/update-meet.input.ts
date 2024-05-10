import { CreateMeetInput } from './create-meet.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateMeetInput extends PartialType(CreateMeetInput) {
  id: number;
}
