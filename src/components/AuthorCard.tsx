import {
	Avatar,
	Card,
	CardBody,
	Heading,
	Stack,
	Text,
	Tooltip,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type AuthorCardProps = {
	id: string;
	name: string;
	bio: string;
};

export default function AuthorCard({ name, bio, id }: AuthorCardProps) {
	const navigate = useNavigate();
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
					<Avatar name={name} size="lg" />
					<Stack mt="6" spacing="3">
						<Heading size="lg">{name}</Heading>
						<Text>{bio}</Text>
					</Stack>
				</CardBody>
			</Card>
		</Tooltip>
	);
}
