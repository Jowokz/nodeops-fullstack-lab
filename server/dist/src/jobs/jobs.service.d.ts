import { PrismaService } from '../prisma/prisma.service';
export declare class JobsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): any;
    findOne(id: string): Promise<any>;
    remove(id: string): Promise<any>;
}
