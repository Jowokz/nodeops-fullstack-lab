"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugService = void 0;
const common_1 = require("@nestjs/common");
const worker_threads_1 = require("worker_threads");
const path_1 = __importDefault(require("path"));
let DebugService = class DebugService {
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
            const workerPath = path_1.default.join(__dirname, '../workers/heavy-calculation.worker.js');
            const worker = new worker_threads_1.Worker(workerPath);
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`Worker stopped with exit code ${code}`));
            });
        });
    }
};
exports.DebugService = DebugService;
exports.DebugService = DebugService = __decorate([
    (0, common_1.Injectable)()
], DebugService);
//# sourceMappingURL=debug.service.js.map