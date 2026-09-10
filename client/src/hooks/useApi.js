import { useCallback, useEffect, useState } from 'react';

export function useApi(apiFunction, { immediate = true, args = [] } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (...overrideArgs) => {
    setLoading(true);
    setError('');
    try {
      const result = await apiFunction(...(overrideArgs.length ? overrideArgs : args));
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, JSON.stringify(args)]);

  useEffect(() => {
    if (immediate) execute().catch(() => {});
  }, [execute, immediate]);

  return { data, error, loading, execute };
}
