import { Book } from './Book';

export type Category = {
	id: number;
	name: string;
	priority: number;
	createdAt: Date;
	updatedAt: Date;
	createdBy: string;
	books: Partial<Book>[];
};
