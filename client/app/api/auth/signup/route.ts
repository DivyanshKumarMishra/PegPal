import { type NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  return Response.json({ data: {...body, id: crypto.randomUUID(), role: 'user'} });
}
