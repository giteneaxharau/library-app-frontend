import {
	Box,
	Grid,
	GridItem,
	Heading,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Book } from '../types/Book';
import fetch from '../utils/fetch';
import BookCard from './BookCard';

export default function MainBooks() {
	const { data, isLoading, error } = useQuery('books', () =>
		fetch.get('/books')
	);
	console.log('MainBooks 16: ', error);
	if (isLoading) return <div>Loading...</div>;
	return (
		<>
			<Box
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				w={'full'}
			>
				<Heading
					fontWeight={700}
					fontSize="4xl"
					color={useColorModeValue('gray.800', 'white')}
				>
					Find your favorite books
				</Heading>
			</Box>
			<Grid
				templateColumns={{
					base: 'repeat(1, 1fr)',
					md: 'repeat(2, 1fr)',
					lg: 'repeat(3, 1fr)',
					sm: 'repeat(1, 1fr)',
				}}
				alignItems="center"
				justifyItems="center"
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
		</>
	);
}
