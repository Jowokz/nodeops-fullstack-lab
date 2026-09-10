"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const fs = __importStar(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const prisma_service_1 = require("../prisma/prisma.service");
let JobsProcessor = class JobsProcessor extends bullmq_1.WorkerHost {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async process(job) {
        const { dbJobId, filePath } = job.data;
        await this.prisma.csvJob.update({
            where: { id: dbJobId },
            data: { status: 'processing' },
        });
        let processedRows = 0;
        let failedRows = 0;
        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe((0, csv_parser_1.default)())
                .on('data', async () => {
                processedRows += 1;
                if (processedRows % 100 === 0) {
                    await job.updateProgress(processedRows);
                }
            })
                .on('error', (err) => {
                failedRows += 1;
                reject(err);
            })
                .on('end', () => resolve());
        });
        await this.prisma.csvJob.update({
            where: { id: dbJobId },
            data: {
                status: 'completed',
                processedRows,
                failedRows,
            },
        });
        return { status: 'completed', processedRows, failedRows };
    }
};
exports.JobsProcessor = JobsProcessor;
exports.JobsProcessor = JobsProcessor = __decorate([
    (0, bullmq_1.Processor)('csv-jobs'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JobsProcessor);
//# sourceMappingURL=jobs.processor.js.map