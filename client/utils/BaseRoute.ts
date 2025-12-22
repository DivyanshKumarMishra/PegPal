import { NextRequest } from 'next/server';
import CreateErrorObj from './Error';

type RouteHandler = (req?: NextRequest) => Promise<Response>;

export default function BaseRoute(handler: RouteHandler): RouteHandler {
  return async function (req?: NextRequest) {
    try {
      return await handler(req);
    } catch (error) {
      const { message, details, status } = CreateErrorObj(error);
      return Response.json(
        {
          message,
          details,
        },
        {
          status: status ?? 500,
        }
      );
    }
  };
}
