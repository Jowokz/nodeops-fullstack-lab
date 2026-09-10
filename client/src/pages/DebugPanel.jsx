import { useState } from 'react';
import { runDebugEndpoint } from '../services/jobService.js';

const debugOptions = [
  { type: 'event-loop', label: 'Event Loop Info' },
  { type: 'blocking', label: 'Blocking CPU Task' },
  { type: 'worker-thread', label: 'Worker Thread Task' }
];

export default function DebugPanel() {
  const [result, setResult] = useState(null);
  const [loadingType, setLoadingType] = useState('');
  const [error, setError] = useState('');

  async function run(type) {
    setLoadingType(type);
    setError('');
    try {
      setResult(await runDebugEndpoint(type));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingType('');
    }
  }

  return (
    <section>
      <h1>Debug Panel</h1>
      <p>Use this to compare event loop info, blocking CPU behavior, and worker-thread behavior.</p>
      <div className="button-row">
        {debugOptions.map(option => (
          <button key={option.type} onClick={() => run(option.type)} disabled={Boolean(loadingType)}>
            {loadingType === option.type ? 'Running...' : option.label}
          </button>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </section>
  );
}
