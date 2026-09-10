import { Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
export declare class UploadsService {
    private readonly csvQueue;
    private readonly prisma;
    constructor(csvQueue: Queue, prisma: PrismaService);
    handleCsvUpload(file?: Express.Multer.File): Promise<{
        message: string;
        dbJobId: any;
        queueJobId: string | undefined;
        status: string;
    }>;
}
