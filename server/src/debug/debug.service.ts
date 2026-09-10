import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import path from 'path';

@Injectable()
export class DebugService {
  getEventLoopInfo() {
    return {
      nodeVersion: process.version,
      pid: process.pid,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };
  }

  runBlockingTask() {
    let total = 0;
    for (let i = 0; i < 500_000_000; i++) {
      total += i;
    }
    return { message: 'Blocking task completed on main thread', total };
  }

  runWorkerThreadTask() {
    return new Promise((resolve, reject) => {
      const workerPath = path.join(__dirname, '../workers/heavy-calculation.worker.js');
      const worker = new Worker(workerPath);

      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  }
}
