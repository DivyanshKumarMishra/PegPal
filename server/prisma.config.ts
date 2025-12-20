/// <reference types="node" />

import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // ! use DIRECT_URL here, it's for migrations
    // ! don't use DATABASE_URL
    url: process.env['DIRECT_URL'],
  },
});
