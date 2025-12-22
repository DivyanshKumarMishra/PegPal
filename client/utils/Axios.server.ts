import axios from 'axios';
import { SERVER_URL } from './Constants';
import { cookies } from 'next/headers';

async function createAxiosNodeClient() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  return axios.create({
    baseURL: SERVER_URL,
    headers: {
      Cookie: cookieHeader,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

export { createAxiosNodeClient };
