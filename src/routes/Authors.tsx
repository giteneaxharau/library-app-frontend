import {
	Box,
	Grid,
	GridItem,
	Heading,
	useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import AuthorCard from '../components/AuthorCard';
import { Author } from '../types/Author';
import API from '../utils/fetch';

export default function Authors() {
	const { data, isLoading, isError } = useQuery('authors', () =>
		API.get('/authors')
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
				<Heading
					fontWeight={700}
					fontSize="4xl"
					color={useColorModeValue('gray.800', 'white')}
				>
					Find your favorite author
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
				{data.result.map((author: Author) => {
					return (
						<GridItem key={author.id} w="100%" h="100%">
							<AuthorCard {...{ author }} />
						</GridItem>
					);
				})}
			</Grid>
		</>
	);
}
