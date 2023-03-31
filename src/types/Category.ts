import { Author } from './Author';
import { Book } from './Book';
import * as z from 'zod';

export const bookIncludedSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string(),
	author: z
		.object({
			id: z.string().uuid(),
			name: z.string(),
			bio: z.string(),
		})
		.partial(),
	images: z.array(z.string().url()),
});

const categorySchema = z.object({
	id: z.number(),
	name: z.string(),
	priority: z.number().max(10).min(1),
	createdAt: z.date().or(z.string().datetime()),
	updatedAt: z.date().or(z.string().datetime()),
	createdBy: z.string(),
	books: z.array(bookIncludedSchema).nullable(),
});

export const categoryCreateSchema = z.object({
	name: z.string(),
	priority: z.number().max(10).min(1),
	books: z
		.array(
			z.object({
				label: z.string(),
				value: z.string(),
			})
		)
		.nullable()
		.or(z.undefined()),
});

export const categoryUpdateSchema = z.object({
	id: z.number(),
	name: z.string(),
	priority: z.number().max(10).min(1),
	books: z
		.array(
			z.object({
				label: z.string(),
				value: z.string(),
			})
		)
		.nullable()
		.or(z.undefined()),
});

export type Category = z.infer<typeof categorySchema>;