import type { ZodError } from 'zod';

export class CustomError extends Error {
  statusCode: number;
  details: Record<string, string> | undefined;

  constructor(
    message: string,
    statusCode: number,
    details?: Record<string, string>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export function getValidationErrors(
  issues: ZodError['issues']
): Record<string, string> {
  return issues.reduce((err: Record<string, string>, issue) => {
    const path = issue.path.join('.');
    err[path] = err[path] ? `${err[path]}, ${issue.message}` : issue.message;
    return err;
  }, {} as Record<string, string>);
}
