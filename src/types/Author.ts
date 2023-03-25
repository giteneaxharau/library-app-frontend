import { User } from './User';

export type Author = {
	id: string;
	name: string;
	bio: string;
	createdAt: Date;
	createdBy: string;
	books: {
		id: string;
		name: string;
		description: string;
		image: string[];
	}[];
	user: User | null;
};
