import { createAxiosNodeClient } from '@/utils/Axios.server';
import BaseRoute from '@/utils/BaseRoute';
import { ME_URL } from '@/utils/Constants';

export const GET = BaseRoute(async () => {
  const axios_node = await createAxiosNodeClient();
  const res = await axios_node.get(ME_URL);
  return Response.json({ ...res?.data });
});
