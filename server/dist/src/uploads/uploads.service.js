"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const prisma_service_1 = require("../prisma/prisma.service");
let UploadsService = class UploadsService {
    constructor(csvQueue, prisma) {
        this.csvQueue = csvQueue;
        this.prisma = prisma;
    }
    async handleCsvUpload(file) {
        if (!file)
            throw new common_1.BadRequestException('CSV file is required');
        const dbJob = await this.prisma.csvJob.create({
            data: {
                originalName: file.originalname,
                status: 'queued',
            },
        });
        const queueJob = await this.csvQueue.add('process-csv', {
            dbJobId: dbJob.id,
            filePath: file.path,
            originalName: file.originalname,
        }, {
            attempts: 3,
            backoff: { type: 'exponential', delay: 3000 },
        });
        await this.prisma.csvJob.update({
            where: { id: dbJob.id },
            data: { queueJobId: String(queueJob.id) },
        });
        return {
            message: 'CSV uploaded and queued',
            dbJobId: dbJob.id,
            queueJobId: queueJob.id,
            status: 'queued',
        };
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)('csv-jobs')),
    __metadata("design:paramtypes", [bullmq_2.Queue,
        prisma_service_1.PrismaService])
], UploadsService);
//# sourceMappingURL=uploads.service.js.map