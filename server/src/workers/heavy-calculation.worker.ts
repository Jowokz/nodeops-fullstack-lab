import { parentPort } from 'worker_threads';

let total = 0;
for (let i = 0; i < 500_000_000; i++) {
  total += i;
}

parentPort?.postMessage({
  message: 'Worker thread task completed without blocking main event loop',
  total,
});
