import { Controller, Get } from '@nestjs/common';
import { DebugService } from './debug.service';

@Controller('debug')
export class DebugController {
  constructor(private readonly debugService: DebugService) {}

  @Get('event-loop')
  eventLoopInfo() {
    return this.debugService.getEventLoopInfo();
  }

  @Get('blocking')
  blockingTask() {
    return this.debugService.runBlockingTask();
  }

  @Get('worker-thread')
  workerThreadTask() {
    return this.debugService.runWorkerThreadTask();
  }
}
