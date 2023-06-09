import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<Header />
			{location.pathname.includes('admin') && (
				<Button w={'32px'} h={'32px'} m={'10px'} onClick={() => navigate(-1)}>
					<ArrowBackIcon />
				</Button>
			)}
			<Flex
				{...{
					p: { base: 8, md: 16 },
					flexDirection: 'column',
					alignItems: 'center',
					flexGrow: 1,
					overflowY: 'auto',
				}}
			>
				{children}
			</Flex>
		</div>
	);
}
