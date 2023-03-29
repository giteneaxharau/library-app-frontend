import { useRouteError } from 'react-router-dom';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export default function ErrorPage({
	title,
	description,
}: {
	title: string;
	description?: string;
}) {
	const error: any = useRouteError();

	return (
		<Box
			textAlign="center"
			h={'100vh'}
			display="flex"
			flexDirection="column"
			alignItems={'center'}
			justifyContent={'center'}
			py={10}
			px={6}
		>
			<Box display="inline-block">
				<Flex
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					bg={'red.500'}
					rounded={'50px'}
					w={'55px'}
					h={'55px'}
					textAlign="center"
				>
					<CloseIcon boxSize={'20px'} color={'white'} />
				</Flex>
			</Box>
			<Heading as="h2" size="xl" mt={6} mb={2}>
				{title}
			</Heading>
			<Text color={'gray.500'}>
				{error?.statusText || error?.message || description}
			</Text>
		</Box>
	);
}
