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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebugController = void 0;
const common_1 = require("@nestjs/common");
const debug_service_1 = require("./debug.service");
let DebugController = class DebugController {
    constructor(debugService) {
        this.debugService = debugService;
    }
    eventLoopInfo() {
        return this.debugService.getEventLoopInfo();
    }
    blockingTask() {
        return this.debugService.runBlockingTask();
    }
    workerThreadTask() {
        return this.debugService.runWorkerThreadTask();
    }
};
exports.DebugController = DebugController;
__decorate([
    (0, common_1.Get)('event-loop'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DebugController.prototype, "eventLoopInfo", null);
__decorate([
    (0, common_1.Get)('blocking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DebugController.prototype, "blockingTask", null);
__decorate([
    (0, common_1.Get)('worker-thread'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DebugController.prototype, "workerThreadTask", null);
exports.DebugController = DebugController = __decorate([
    (0, common_1.Controller)('debug'),
    __metadata("design:paramtypes", [debug_service_1.DebugService])
], DebugController);
//# sourceMappingURL=debug.controller.js.map