import { DebugService } from './debug.service';
export declare class DebugController {
    private readonly debugService;
    constructor(debugService: DebugService);
    eventLoopInfo(): {
        nodeVersion: string;
        pid: number;
        uptime: number;
        memory: NodeJS.MemoryUsage;
    };
    blockingTask(): {
        message: string;
        total: number;
    };
    workerThreadTask(): Promise<unknown>;
}
