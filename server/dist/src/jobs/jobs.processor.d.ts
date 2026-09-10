import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
export declare class JobsProcessor extends WorkerHost {
    private readonly prisma;
    constructor(prisma: PrismaService);
    process(job: Job<{
        dbJobId: string;
        filePath: string;
        originalName: string;
    }>): Promise<{
        status: string;
        processedRows: number;
        failedRows: number;
    }>;
}
