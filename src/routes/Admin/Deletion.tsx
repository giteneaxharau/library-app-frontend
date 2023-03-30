import {
	Box,
	Button,
	FormControl,
	FormLabel,
	useToast,
} from '@chakra-ui/react';
import { Select as ExtraSelect } from 'chakra-react-select';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import API, { Data } from '../../utils/fetch';

export default function Deletion() {
	const { result } = useLoaderData() as Data;
	const navigate = useNavigate();
	const location = useLocation();
	const queryClient = useQueryClient();
	const pathname = location.pathname.split('/')[2];
	const toast = useToast();
	const [id, setId] = useState<string>('');
	const { mutateAsync } = useMutation({
		mutationFn: async (id: string) => {
			return await API.delete(`/${pathname}/${id}`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
			});
		},
		onSuccess(data, variables, context) {
			toast({
				title: 'Element deleted successfully.',
				description: `We've deleted your element for you.`,
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
			navigate('/admin');
		},
		onError(error, variables, context) {
			toast({
				title: 'Element not deleted successfully.',
				description: `We have encountered an error`,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		},
		onMutate: async (id: string) => {
			await queryClient.invalidateQueries(pathname);
		},
	});

	return (
		<Box
			borderWidth="1px"
			rounded="lg"
			shadow="1px 1px 3px rgba(0,0,0,0.3)"
			p={6}
			flexGrow={1}
			display="flex"
			gap={'20px'}
			m="10px auto"
		>
			<FormControl>
				<FormLabel htmlFor="categories" fontWeight={'normal'} mt="2%">
					Select one to delete
				</FormLabel>
				<ExtraSelect
					name={'bookSelect'}
					onChange={(e) => setId((e as any).value)}
					options={result?.map((x: any) => {
						return {
							value: x.id,
							label: x.name,
						};
					})}
					isSearchable
					placeholder="Select one to delete"
					closeMenuOnSelect={false}
					hasStickyGroupHeaders
				/>
			</FormControl>
			<Button
				isDisabled={!id}
				type="button"
				bg={'red'}
				color="white"
				alignSelf={'flex-end'}
				onClick={async () => await mutateAsync(id)}
			>
				Delete
			</Button>
		</Box>
	);
}
