import { Api_Method, ApiResult } from '@/types/base';
import { axios_next } from '@/utils/Axios.client';
import CreateErrorObj from '@/utils/Error';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

export default function useFetch<TBody = unknown, TResponse = unknown>() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const apiFunc: (
    url: string,
    method: Api_Method,
    body?: TBody
  ) => Promise<ApiResult<TResponse>> = async (
    url: string,
    method: Api_Method,
    body?: TBody
  ) => {
    setLoading(true);
    try {
      let response: AxiosResponse;
      switch (method) {
        case Api_Method.GET: {
          response = await axios_next.get(url);
          break;
        }
        case Api_Method.POST: {
          response = await axios_next.post(url, body);
          break;
        }
        case Api_Method.DELETE: {
          response = await axios_next.delete(url);
          break;
        }
      }

      const result: TResponse = response?.data as TResponse;
      setLoading(false);
      return { ok: true, data: result };
    } catch (error: unknown) {
      const { message } = CreateErrorObj(error);
      setError(message);
      toast.error(message);
      setLoading(false);
      return { ok: false };
    }
  };

  return { apiFunc, error, loading };
}
