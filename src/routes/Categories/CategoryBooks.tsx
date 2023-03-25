import { Box, Grid, GridItem, Text, useColorModeValue } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useParams, useLocation } from 'react-router-dom';
import BookCard from '../../components/BookCard';
import { Book } from '../../types/Book';
import { Category } from '../../types/Category';
import API from '../../utils/fetch';

export default function CategoryBooks() {
	const query = useLocation();
	const { data, error, isLoading } = useQuery('books', () =>
		API.get(`categories/${query.state}?include=true`)
	);
	if (isLoading) return <div>Loading...</div>;
	return (
		<>
			<Box
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				w={'full'}
			>
				<Text
					fontFamily={'heading'}
					fontWeight={700}
					fontSize="4xl"
					color={useColorModeValue('gray.800', 'white')}
				>
					{data.result.name}
				</Text>
			</Box>
			<Grid
				templateColumns={{
					base: 'repeat(3, 1fr)',
					md: 'repeat(2, 1fr)',
					lg: 'repeat(3, 1fr)',
					sm: 'repeat(1, 1fr)',
				}}
				gap={10}
			>
				{data.result.books.map((book: Partial<Book>) => {
					return (
						<GridItem key={book.id} w="100%" h="100%">
							<BookCard book={book as Book} />
						</GridItem>
					);
				})}
			</Grid>
		</>
	);
}
