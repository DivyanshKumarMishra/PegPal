import { type NextRequest } from 'next/server';
import { LOGIN_URL } from '@/utils/Constants';
import { createAxiosNodeClient } from '@/utils/Axios.server';
import BaseRoute from '@/utils/BaseRoute';

export const POST = BaseRoute(async (req?: NextRequest) => {
  const body = await req?.json();
  const axios_node = await createAxiosNodeClient();
  const res = await axios_node.post(LOGIN_URL, body);

  // 🔑 Extract Set-Cookie from backend
  const backendCookies = res.headers['set-cookie'];

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  if (backendCookies) {
    for (const cookie of backendCookies) {
      headers.append('Set-Cookie', cookie);
    }
  }

  // 🔥 Forward it to browser
  return Response.json(
    { ...res?.data },
    {
      headers: headers,
    }
  );
});
