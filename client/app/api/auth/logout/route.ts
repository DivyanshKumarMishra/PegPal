import { createAxiosNodeClient } from '@/utils/Axios.server';
import BaseRoute from '@/utils/BaseRoute';
import { LOGOUT_URL } from '@/utils/Constants';

export const POST = BaseRoute(async () => {
  const axios_node = await createAxiosNodeClient();
  const response = await axios_node.post(LOGOUT_URL);

  const backendCookies = response.headers['set-cookie'];

  if (!backendCookies || backendCookies.length === 0) {
    throw new Error('Something went wrong');
  }

  const headers = new Headers();

  // 🔥 forward ALL Set-Cookie headers exactly as backend sent
  for (const cookie of backendCookies) {
    headers.append('Set-Cookie', cookie);
  }

  return Response.json(response?.data, {
    headers,
  });
});
