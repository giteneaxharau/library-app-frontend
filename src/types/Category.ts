import { Author } from './Author';
import { Book } from './Book';

export type Category = {
	id: number;
	name: string;
	priority: number;
	createdAt: Date;
	updatedAt: Date;
	createdBy: string;
	books: {
		id: string;
		name: string;
		description: string;
		author: Partial<Author>;
		image: string[];
	}[];
};
