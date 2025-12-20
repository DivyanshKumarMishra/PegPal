import { useState } from 'react';
import { toast } from 'sonner';

export default function useFetch<TResponse = unknown>() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const apiFunc: (
    url: string,
    options: RequestInit
  ) => Promise<TResponse> = async (url: string, options: RequestInit) => {
    setLoading(true);
    try {
      const res = await fetch(url, options);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.error || 'Request failed');
      }

      return result?.data;
    } catch (error: unknown) {
      const err =
        error instanceof Error ? error?.message : 'Something went wrong';
        
      setError(err);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { apiFunc, error, loading };
}
