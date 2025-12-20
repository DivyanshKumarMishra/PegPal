import { signup_schema } from '@/types/auth/auth.schema';
import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsedData = signup_schema.safeParse(body);
  console.log(parsedData);
  return Response.json({ data: {...body, id: crypto.randomUUID(), role: 'user'} });
}