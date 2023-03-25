import { Grid, GridItem } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Book } from '../types/Book';
import fetch from '../utils/fetch';
import BookCard from './BookCard';

export default function MainBooks() {
	const { data, isLoading } = useQuery('books', () => fetch.get('/books'));
	// console.log(data.result);
	if (isLoading) return <div>Loading...</div>;
	return (
		<Grid
			templateColumns={{
				base: 'repeat(3, 1fr)',
				md: 'repeat(2, 1fr)',
				lg: 'repeat(3, 1fr)',
				sm: 'repeat(1, 1fr)',
			}}
			gap={10}
		>
			{data.result.map((book: Book) => {
				return (
					<GridItem key={book.id} w="100%" h="100%">
						<BookCard book={book} />
					</GridItem>
				);
			})}
		</Grid>
	);
}
