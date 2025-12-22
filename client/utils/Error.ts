import { ErrorResponse } from '@/types/base';
import axios from 'axios';

export default function CreateErrorObj(error: unknown): ErrorResponse {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    const data = error.response?.data;
    const message =
      typeof data === 'object' && data && 'message' in data
        ? String(data?.message)
        : error.message || 'Request failed';

    const err = new Error(message) as ErrorResponse;

    err.status = status;

    if (
      typeof data === 'object' &&
      data &&
      'details' in data &&
      typeof data?.details === 'object'
    ) {
      err.details = data?.details;
    }

    return err;
  }

  if (error instanceof Error) {
    const err = error as ErrorResponse;
    err.status ??= 500;
    return err;
  }

  const err = new Error('Internal server error') as ErrorResponse;
  err.status = 500;
  return err;
}
