import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Heading,
	Image,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Book } from '../types/Book';

type BookCardProps = {
	book: Book;
};
export default function BookCard({ book }: BookCardProps) {
	const { userJWT } = useAuth();
	const { id: bookId, name, description, categories, author } = book;
	const navigate = useNavigate();
	return (
		<Card
			maxW="sm"
			shadow={'lg'}
			boxShadow={'lg'}
			dropShadow={'lg'}
			cursor={userJWT?.role === 'Admin' ? 'pointer' : 'default'}
			onClick={() =>
				userJWT?.role === 'Admin'
					? navigate('/admin/books/update', {
							state: book,
					  })
					: null
			}
		>
			<CardBody>
				<Image
					src={
						book?.images?.[0] ||
						'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80'
					}
					sx={{ objectFit: 'cover' }}
					alt={name + " book's cover"}
					borderRadius="lg"
				/>
				<Stack mt="6" spacing="3">
					<Heading size="lg">{name}</Heading>
					<Text fontSize={'xl'}>{author.name}</Text>
					<Text>{description}</Text>
				</Stack>
			</CardBody>
		</Card>
	);
}
