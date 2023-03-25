import * as z from 'zod';

export type User = {
	id: string;
	email: string;
	userName: string;
	firstName: string;
	lastName: string;
	role: 'Admin' | 'Author';
};

export const loginSchema = z.object({
	userName: z.string(),
	password: z.string(),
});

export const registerSchema = z.object({
	email: z.string().email(),
	userName: z.string(),
	firstName: z.string(),
	role: z.enum(['Admin', 'Author']),
	lastName: z.string(),
	password: z.string().min(6),
});
