import { useCallback, useState } from 'react';
import JobCard from '../components/JobCard.jsx';
import { getJobById } from '../services/jobService.js';
import { useJobs } from '../hooks/useJobs.js';

export default function Jobs() {
  const { data, loading, error, execute, completedJobs } = useJobs();
  const [selectedJob, setSelectedJob] = useState(null);
  const jobs = Array.isArray(data) ? data : [];

  const handleSelect = useCallback(async (id) => {
    const detail = await getJobById(id);
    setSelectedJob(detail);
  }, []);

  return (
    <section>
      <h1>Jobs</h1>
      <button onClick={execute}>Refresh Jobs</button>
      {loading && <p>Loading jobs...</p>}
      {error && <p className="error">{error}</p>}
      <p>Completed jobs: {completedJobs.length}</p>
      <div className="grid">
        {jobs.length === 0 && !loading && <p>No jobs yet.</p>}
        {jobs.map(job => <JobCard key={job.id} job={job} onSelect={handleSelect} />)}
      </div>
      {selectedJob && (
        <section className="panel">
          <h2>Selected Job</h2>
          <pre>{JSON.stringify(selectedJob, null, 2)}</pre>
        </section>
      )}
    </section>
  );
}
