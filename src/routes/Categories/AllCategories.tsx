import { Grid, GridItem } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import CategoryCard from '../../components/CategoryCard';
import { Category } from '../../types/Category';
import API from '../../utils/fetch';

export default function AllCategories() {
	const { data, error, isLoading } = useQuery('categories', () =>
		API.get('/categories')
	);
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
			{data.result.map((category: Category) => {
				return (
					<GridItem key={category.id} w="100%" h="100%">
						<CategoryCard category={category} />
					</GridItem>
				);
			})}
			;
		</Grid>
	);
}
