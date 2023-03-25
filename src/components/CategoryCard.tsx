import {
	Box,
	Button,
	Center,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types/Category';

interface CategoryCardProps {
	category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
	const navigation = useNavigate();
	const { name, priority } = category;
	return (
		<Center py={6}>
			<Box
				maxW={'330px'}
				w={'full'}
				bg={useColorModeValue('white', 'gray.800')}
				boxShadow={'2xl'}
				rounded={'md'}
				overflow={'hidden'}
			>
				<Stack
					textAlign={'center'}
					p={6}
					color={useColorModeValue('gray.800', 'white')}
					align={'center'}
				>
					<Text
						fontSize={'md'}
						fontWeight={500}
						bg={useColorModeValue('green.50', 'green.900')}
						p={2}
						px={3}
						color={'green.500'}
						rounded={'full'}
					>
						{'Priority: ' + priority}
					</Text>
					<Stack direction={'row'} align={'center'} justify={'center'}>
						<Text fontSize={'6xl'} fontWeight={800}>
							{name}
						</Text>
					</Stack>
				</Stack>

				<Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
					<Button
						mt={10}
						w={'full'}
						bg={'green.400'}
						color={'white'}
						rounded={'xl'}
						boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
						_hover={{
							bg: 'green.500',
						}}
						_focus={{
							bg: 'green.500',
						}}
						onClick={() =>
							navigation(`/categories/${category.name.toLowerCase()}`, {
								state: category.id,
							})
						}
					>
						See the books
					</Button>
				</Box>
			</Box>
		</Center>
	);
}
