import { z } from 'zod';
import { login_schema, signup_schema } from './auth.schema';

export type SignupValues = z.infer<typeof signup_schema>;
export type LoginValues = z.infer<typeof login_schema>;
