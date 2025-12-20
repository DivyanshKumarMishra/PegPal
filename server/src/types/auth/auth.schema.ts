import { z } from 'zod';

export const SignupSchema = z.object({
  full_name: z.string().min(6, 'Name must contain atleast 6 characters'),
  email: z.email(),
  password: z
    .string()
    .min(8, 'Password must contain atleast 8 characters')
    .regex(/[A-Z]/g, 'Password must contain one uppercase letter')
    .regex(/[a-z]/g, 'Password must contain one lowercase letter')
    .regex(/[0-9]/g, 'Password must contain one number')
    .regex(
      /[^A-Za-z0-9]/g,
      'Password must contain atleast one special character'
    ),
  gender: z.enum(['MALE', 'FEMALE', 'OTHERS'], {
    error: 'Gender is required',
  }),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must contain atleast 8 characters'),
});

export type SignupValues = z.infer<typeof SignupSchema>;
export type LoginValues = z.infer<typeof LoginSchema>;
