import { z } from 'zod';

export const signInSchema = z.object({
  username: z
    .string()
    .min(3, 'Username or email must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  keepLoggedIn: z.boolean(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
