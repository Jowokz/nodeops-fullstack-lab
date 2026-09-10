import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.csvJob.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const job = await this.prisma.csvJob.findUnique({ where: { id } });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.csvJob.delete({ where: { id } });
  }
}
