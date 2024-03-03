

import React, { useEffect, useState } from 'react';
import { ITask } from './interface';

interface FetchState {
  data: ITask[];
  loading: boolean;
  error: string | null;
}

const useFetch = (url: string) => {
  const [fetchState, setFetchState] = useState<FetchState>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
  
        setTimeout(async () => {
          const res = await fetch(url);

          if (!res.ok) {
            throw new Error(`Got Error: ${res.status}`);
          }

          const jsonData = await res.json();
          setFetchState({ data: jsonData, loading: false, error: null });
        }, 1000);
      } catch (err) {
        setFetchState({ data: [], loading: false, error: `Error: ${err}` });
      }
    };

    fetchData();
  }, [url]);

  return fetchState;
};

export default useFetch;