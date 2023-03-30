import * as z from 'zod';
import API from '../utils/fetch';
import { bookIncludedSchema } from './Category';

const authorSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	bio: z.string(),
	createdAt: z.date().or(z.string().datetime()),
	createdBy: z.string(),
	books: z.array(bookIncludedSchema).nullable(),
	user: z
		.object({
			id: z.string().uuid(),
			email: z.string().email(),
			userName: z.string(),
			firstName: z.string(),
			lastName: z.string(),
			role: z.enum(['Admin', 'Author']),
		})
		.nullable(),
});

export const authorCreateSchema = z.object({
	name: z.string(),
	bio: z.string(),
	userId: z.string().uuid(),
});
export const authorUpdateSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	bio: z.string(),
	userId: z.string().uuid(),
});
export type Author = z.infer<typeof authorSchema>;


export function authorQuery(id: string, params:any){
	return {
		queryKey: ['author', id],
		queryFn: async () => {
			const response = await API.get(`/authors/${id}`);
			return response;
		},
	}
};