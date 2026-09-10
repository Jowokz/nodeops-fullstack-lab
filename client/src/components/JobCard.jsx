import React from 'react';

function JobCard({ job, onSelect }) {
  return (
    <article className="card">
      <h3>Job #{job.id}</h3>
      <p>Status: <strong>{job.status}</strong></p>
      <p>Progress: {job.progress ?? 0}%</p>
      <button onClick={() => onSelect(job.id)}>View Details</button>
    </article>
  );
}

export default React.memo(JobCard);
