import { UploadsService } from './uploads.service';
export declare class UploadsController {
    private readonly uploadsService;
    constructor(uploadsService: UploadsService);
    uploadCsv(file: Express.Multer.File): Promise<{
        message: string;
        dbJobId: any;
        queueJobId: string | undefined;
        status: string;
    }>;
}
