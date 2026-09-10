import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import * as fs from 'fs';
import csv from 'csv-parser';
import { PrismaService } from '../prisma/prisma.service';

@Processor('csv-jobs')
export class JobsProcessor extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<{ dbJobId: string; filePath: string; originalName: string }>) {
    const { dbJobId, filePath } = job.data;

    await this.prisma.csvJob.update({
      where: { id: dbJobId },
      data: { status: 'processing' },
    });

    let processedRows = 0;
    let failedRows = 0;

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', async () => {
          processedRows += 1;
          if (processedRows % 100 === 0) {
            await job.updateProgress(processedRows);
          }
        })
        .on('error', (err) => {
          failedRows += 1;
          reject(err);
        })
        .on('end', () => resolve());
    });

    await this.prisma.csvJob.update({
      where: { id: dbJobId },
      data: {
        status: 'completed',
        processedRows,
        failedRows,
      },
    });

    return { status: 'completed', processedRows, failedRows };
  }
}
