import { IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  originalName: string;
}
