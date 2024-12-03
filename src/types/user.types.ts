import {z} from 'zod';

export const loginSchema = z.object({
	login: z.string().nonempty('Login is required'),
	password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
});

// Опционально можно указать тип данных на основе схемы
export type LoginFormValues = z.infer<typeof loginSchema>;
