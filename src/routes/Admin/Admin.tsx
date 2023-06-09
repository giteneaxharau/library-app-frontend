import {
	AddIcon,
	DeleteIcon,
	InfoOutlineIcon,
	PlusSquareIcon,
	RepeatIcon,
} from '@chakra-ui/icons';
import {
	Card,
	CardBody,
	Flex,
	Heading,
	Stack,
	Text,
	Icon,
	Button,
	Box,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { capitalize } from '../../utils/utils';

export default function Admin() {
	const { userJWT } = useAuth();
	const role = userJWT?.role;
	return (
		<>
			<Flex
				flexWrap={'wrap'}
				flexDirection="row"
				alignItems={'flex-start'}
				gap={10}
			>
				{panelHandler
					.filter((p) => (role === 'Author' ? p.name === 'books' : true))
					.map((panel) => {
						const { name, services } = panel;
						return (
							<Box cursor={'pointer'} flexShrink={1} flexGrow={1}>
								<Heading textAlign={'center'}>{capitalize(name)}</Heading>
								<Stack spacing={'4'}>
									{services
										.filter((s) =>
											role === 'Author' ? s.path === 'create' : true
										)
										.map((service) => {
											const { path, icon, label } = service;
											return (
												<Panel
													key={path}
													path={`${name}/${path}`}
													icon={icon}
													label={label}
												/>
											);
										})}
								</Stack>
							</Box>
						);
					})}
				<Panel
					path="report"
					icon={<InfoOutlineIcon boxSize={10} />}
					label="Report Page"
				/>
			</Flex>
		</>
	);
}

type PanelProps = {
	path: string;
	label: string;
	icon: React.ReactNode;
};

function Panel({ path, icon, label }: PanelProps) {
	const navigate = useNavigate();
	return (
		<Card
			shadow={'xl'}
			boxShadow={'xl'}
			dropShadow={'xl'}
			cursor={'pointer'}
			flexShrink={1}
			flexGrow={1}
			_hover={{
				transform: 'scale(1.03)',
			}}
			onClick={() => navigate('/admin/' + path)}
		>
			<CardBody>
				<Flex alignItems={'center'} justifyContent="space-between" gap={10}>
					<Heading size="lg">{label}</Heading>
					{icon || <Icon />}
				</Flex>
			</CardBody>
		</Card>
	);
}
const services = [
	{
		path: 'create',
		icon: <AddIcon boxSize={10} />,
	},
	{
		path: 'update',
		icon: <RepeatIcon boxSize={10} />,
	},
	{
		path: 'delete',
		icon: <DeleteIcon boxSize={10} />,
	},
];

const panelHandler = [
	{
		name: 'books',
		services: services.map((service) => ({
			...service,
			label: `${capitalize(service.path)} Book`,
		})),
	},
	{
		name: 'categories',
		services: services.map((service) => ({
			...service,
			label: `${capitalize(service.path)} Category`,
		})),
	},
	{
		name: 'authors',
		services: services.map((service) => ({
			...service,
			label: `${capitalize(service.path)} Author`,
		})),
	},
];
