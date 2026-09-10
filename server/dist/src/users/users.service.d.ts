import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): any;
    create(data: {
        email: string;
        password: string;
        name: string;
    }): any;
}
