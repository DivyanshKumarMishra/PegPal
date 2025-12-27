export type ErrorResponse = Error & {
  details?: Record<string, string> | undefined | null;
  status?: number | undefined;
};

export type ApiResult<T> =
  | { ok: true; data?: T }
  | { ok: false; error?: ErrorResponse };

export enum Api_Method {
  'GET',
  'POST',
  'DELETE',
}
