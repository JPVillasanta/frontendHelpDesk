import { useEffect, useRef, useState } from 'react';

export default function useFetch(fetcher, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const fetcherRef = useRef(fetcher);
  const dependencyKey = JSON.stringify(dependencies);

  useEffect(() => { fetcherRef.current = fetcher; }, [fetcher]);

  useEffect(() => {
    let active = true;
    fetcherRef.current()
      .then((result) => { if (active) { setData(result); setError(''); } })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
    // The caller controls reruns through the serialized dependency values.
  }, [dependencyKey]);

  return { data, setData, loading, error };
}
