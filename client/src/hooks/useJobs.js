import { useMemo } from 'react';
import { getJobs } from '../services/jobService';
import { useApi } from './useApi';

export function useJobs() {
  const jobsApi = useApi(getJobs);

  const completedJobs = useMemo(() => {
    const jobs = Array.isArray(jobsApi.data) ? jobsApi.data : [];
    return jobs.filter(job => job.status === 'completed');
  }, [jobsApi.data]);

  return { ...jobsApi, completedJobs };
}
