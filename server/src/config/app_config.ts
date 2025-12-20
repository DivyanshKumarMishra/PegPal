import type { CorsOptions } from 'cors';
import {
  DAYS_PER_WEEK,
  HOURS_PER_DAY,
  MILLISECONDS_PER_SECOND,
  MINUTES_PER_HOUR,
  SECONDS_PER_MINUTE,
} from '../utils/constants';

const PORT: number = Number(process.env.PORT) || 3001;
const ORIGINS: string[] = process.env.ORIGINS?.split(',') || [
  'http://localhost:3000',
];

const CORS_OPTIONS: CorsOptions = {
  origin: ORIGINS,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true,
};

const JWT_EXPIRY: number =
  DAYS_PER_WEEK * HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE;

const COOKIE_EXPIRY: number =
  DAYS_PER_WEEK *
  HOURS_PER_DAY *
  MINUTES_PER_HOUR *
  SECONDS_PER_MINUTE *
  MILLISECONDS_PER_SECOND;

const NODE_ENV: string = process.env.NODE_ENV ?? 'development';

const JWT_SECRET: string = process.env.JWT_SECRET!;

export { PORT, CORS_OPTIONS, JWT_SECRET, JWT_EXPIRY, COOKIE_EXPIRY, NODE_ENV };
