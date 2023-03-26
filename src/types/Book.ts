import * as z from 'zod';

const bookSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string(),
	createdAt: z.date().or(z.string().datetime()),
	updatedAt: z.date().or(z.string().datetime()),
	images: z.array(z.string().url()),
	createdBy: z.string(),
	author: z.object({
		id: z.string().uuid(),
		name: z.string(),
		bio: z.string(),
	}),
	categories: z.array(
		z.object({ id: z.number(), name: z.string(), priority: z.number() })
	),
});

export const bookCreateSchema = z.object({
	name: z.string(),
	description: z.string(),
	authorId: z.string().uuid(),
	categories: z.array(
		z.object({ id: z.number(), name: z.string(), priority: z.number() })
	),
});

export const bookUpdateSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string(),
	authorId: z.string().uuid(),
	categories: z.array(
		z.object({ id: z.number(), name: z.string(), priority: z.number() })
	),
});

export type Book = z.infer<typeof bookSchema>;
