import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadsService {
  constructor(
    @InjectQueue('csv-jobs') private readonly csvQueue: Queue,
    private readonly prisma: PrismaService,
  ) {}

  async handleCsvUpload(file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('CSV file is required');

    const dbJob = await this.prisma.csvJob.create({
      data: {
        originalName: file.originalname,
        status: 'queued',
      },
    });

    const queueJob = await this.csvQueue.add(
      'process-csv',
      {
        dbJobId: dbJob.id,
        filePath: file.path,
        originalName: file.originalname,
      },
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 3000 },
      },
    );

    await this.prisma.csvJob.update({
      where: { id: dbJob.id },
      data: { queueJobId: String(queueJob.id) },
    });

    return {
      message: 'CSV uploaded and queued',
      dbJobId: dbJob.id,
      queueJobId: queueJob.id,
      status: 'queued',
    };
  }
}
