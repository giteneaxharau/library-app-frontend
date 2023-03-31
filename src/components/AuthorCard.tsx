import {
	Avatar,
	Card,
	CardBody,
	Heading,
	Stack,
	Text,
	Tooltip,
	Badge,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Author } from '../types/Author';

type AuthorCardProps = {
	author: Author;
	index?: number;
};

export default function AuthorCard({ author, index }: AuthorCardProps) {
	const navigate = useNavigate();
	const { name, bio, books, id } = author;
	console.log('index', index);
	return (
		<Tooltip
			label="See this authors books"
			aria-label="A tooltip"
			hasArrow
			placement="auto"
			fontSize={'xl'}
			arrowSize={20}
		>
			<Card
				maxW="sm"
				shadow={'lg'}
				boxShadow={'lg'}
				dropShadow={'lg'}
				cursor={'pointer'}
				onClick={() =>
					navigate('/authors/' + name.split(' ').join(''), {
						state: id,
					})
				}
			>
				<CardBody display={'flex'} flexDirection="column" alignItems={'center'}>
					{index && index >= 0 && (
						<Badge variant="solid" colorScheme="green" m="10px" fontSize="1em">
							{index}
						</Badge>
					)}
					<Avatar name={name} size="lg" />
					{books && books.length ? (
						<Text>Number of books {books.length}</Text>
					) : null}
					<Stack mt="6" spacing="3">
						<Heading size="lg">{name}</Heading>
						<Text>{bio}</Text>
					</Stack>
				</CardBody>
			</Card>
		</Tooltip>
	);
}
