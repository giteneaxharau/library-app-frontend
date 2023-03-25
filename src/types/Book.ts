import { Category } from './Category';

export type Book = {
	id: string;
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	images: string[];
	createdBy: string;
	categories: Partial<Category>[];
};
