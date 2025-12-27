import { ApiResult } from '@/types/base';
import CreateErrorObj from '@/utils/Error';
import { useState } from 'react';

export default function useServerAction<
  TBody = unknown,
  TResponse = unknown
>() {
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const actionFunc: (
    cb: (body?: TBody) => Promise<ApiResult<TResponse>>,
    body?: TBody
  ) => Promise<ApiResult<TResponse>> = async (cb, body) => {
    setActionLoading(true);
    try {
      const response = await cb(body);
      if (!response.ok) {
        return { ok: response.ok, error: response.error };
      }
      return { ok: true, data: response.data as TResponse };
    } catch (error) {
      const err = CreateErrorObj(error);
      setError(err.message);
      return { ok: false, error: err };
    } finally {
      setActionLoading(false);
    }
  };

  const resetError = () => {
    setError(null);
  };

  return { actionLoading, error, resetError, actionFunc };
}
