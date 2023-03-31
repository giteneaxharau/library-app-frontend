import { Grid, GridItem } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useLoaderData } from 'react-router-dom';
import AuthorCard from '../../components/AuthorCard';
import { Author } from '../../types/Author';
import API, { Data } from '../../utils/fetch';

export default function ReportPage() {
	const data = useLoaderData() as Data;
	const result = data.result as Author[];
	return (
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
			{result.map((author: Author, index: number) => {
				return (
					<GridItem key={author.id} w="100%" h="100%">
						<AuthorCard {...{ author, index: index + 1 }} />
					</GridItem>
				);
			})}
		</Grid>
	);
}
