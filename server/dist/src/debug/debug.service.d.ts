export declare class DebugService {
    getEventLoopInfo(): {
        nodeVersion: string;
        pid: number;
        uptime: number;
        memory: NodeJS.MemoryUsage;
    };
    runBlockingTask(): {
        message: string;
        total: number;
    };
    runWorkerThreadTask(): Promise<unknown>;
}
