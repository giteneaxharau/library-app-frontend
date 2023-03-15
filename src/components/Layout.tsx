import { Box } from '@chakra-ui/react';
import Header from './Header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<Header />
			<Box
				{...{
					p: { base: 8, md: 16 },
					minH: '100%',
					overflowY: 'auto',
				}}
			>
				{children}
			</Box>
		</div>
	);
}
