import { useApi } from '../hooks/useApi.js';
import { getHealth } from '../services/jobService.js';

export default function Dashboard() {
  const { data, loading, error, execute } = useApi(getHealth);

  return (
    <section>
      <h1>Dashboard</h1>
      <p>This page demonstrates API calls with useEffect, loading states, and conditional rendering.</p>
      <button onClick={execute}>Refresh Health</button>
      {loading && <p>Loading backend health...</p>}
      {error && <p className="error">{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </section>
  );
}
