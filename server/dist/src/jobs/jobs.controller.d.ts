import { JobsService } from './jobs.service';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    findAll(): any;
    findOne(id: string): Promise<any>;
    remove(id: string): Promise<any>;
}
