import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { JobsService } from './jobs.service';

@Controller('jobs')
@UseGuards(JwtGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}
