import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must contain at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  .regex(/[a-z]/, 'Password must contain a lowercase letter')
  .regex(/[0-9]/, 'Password must contain a number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain a special character');

export const signup_schema = z
  .object({
    full_name: z.string().min(6, 'Name must contain atleast 6 letters'),
    email: z.string().email('Enter a valid email address'),
    password: passwordSchema,
    confirm_password: z.string().min(1, 'Confirm password is required'),
    gender: z.enum(['Male', 'Female', 'Others']).nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.gender === null || data.gender === undefined) {
      ctx.addIssue({
        path: ['gender'],
        message: 'Gender is required',
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        path: ['confirm_password'],
        message: 'Passwords do not match',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const login_schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
});

/*
 ! z.infer<typeof signup_schema>
 * infers the type of form values object received upon successful validation
*/
