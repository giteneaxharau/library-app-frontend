import { Category } from './Category';

export type Book = {
	id: string;
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	createdBy: string;
	categories: Partial<Category>[];
};
