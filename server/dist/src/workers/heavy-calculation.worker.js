"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
let total = 0;
for (let i = 0; i < 500_000_000; i++) {
    total += i;
}
worker_threads_1.parentPort?.postMessage({
    message: 'Worker thread task completed without blocking main event loop',
    total,
});
//# sourceMappingURL=heavy-calculation.worker.js.map