import {
	Box,
	Button,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
	Textarea,
	useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Book } from '../../types/Book';
import { Select as ExtraSelect } from 'chakra-react-select';

import API, { Data } from '../../utils/fetch';
import {
	Author,
	authorUpdateSchema,
	authorCreateSchema,
} from '../../types/Author';
import { User } from '../../types/User';
import { useState } from 'react';

export default function AuthorForm() {
	const loader = useLoaderData() as Data;
	const result = loader?.result || null;
	const query = useLocation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [author, setAuthor] = useState<Author | null>(query.state || null);
	const { data: usersQuery } = useQuery(
		['authors', 'users'],
		async () => await API.get('/authors/users')
	);
	const { mutateAsync } = useMutation({
		mutationFn: async (data: any) => {
			if (author) {
				return await API.put(`/authors/${data.id}`, data, {
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem('token')}`,
					},
				});
			} else {
				return await API.post('/authors', data, {
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem('token')}`,
					},
				});
			}
		},
		onSuccess(data, variables, context) {
			toast({
				title: 'Author ' + (author ? 'updated' : 'created') + ' successfully.',
				description: `We've ${
					author ? 'updated' : 'created'
				} your Author for you.`,
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
			navigate('/admin');
		},
		onError(error, variables, context) {
			toast({
				title:
					'Author ' + (author ? 'updated' : 'created') + ' not succesfully.',
				description: `We have encountered an error`,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		},
		onMutate: async (data: any) => {
			await queryClient.invalidateQueries({ queryKey: 'books' });
		},
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
		watch,
		control,
		setValue,
	} = useForm({
		resolver: zodResolver(author ? authorUpdateSchema : authorCreateSchema),
	});
	const toast = useToast();

	const authorService = async (data: any, e: any) => {
		e.preventDefault();
		const authorEntity = { ...data };
		await mutateAsync(authorEntity);
	};
	return (
		<>
			<Box
				borderWidth="1px"
				rounded="lg"
				shadow="1px 1px 3px rgba(0,0,0,0.3)"
				p={6}
				flexGrow={1}
				m="10px auto"
			>
				{!author && query.pathname.split('/')[3] === 'update' ? (
					<FormControl>
						<FormLabel htmlFor="categories" fontWeight={'normal'} mt="2%">
							Select an author to update
						</FormLabel>
						<ExtraSelect
							name={'bookSelect'}
							onChange={(e) => setAuthor((e as any)?.value || null)}
							options={result?.map((x: Book) => {
								return {
									value: x,
									label: x.name,
								};
							})}
							isSearchable
							placeholder="Select one of these categories..."
							closeMenuOnSelect={false}
							hasStickyGroupHeaders
						/>
					</FormControl>
				) : (
					<form onSubmit={handleSubmit(authorService)}>
						<Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
							{author ? 'Update Author' : 'Create Author'}
						</Heading>
						{author && (
							<Input
								type={'hidden'}
								id="id"
								{...register('id', {
									value: author?.id || null,
								})}
							/>
						)}
						<FormControl mr="5%">
							<FormLabel htmlFor="name" fontWeight={'normal'}>
								Name
							</FormLabel>
							<Input
								id="name"
								placeholder="Author Name"
								type={'text'}
								{...register('name', {
									value: author?.name || null,
								})}
							/>
							{(errors as any)?.name && (
								<FormHelperText color={'red'}>
									{(errors as any)?.name.message}
								</FormHelperText>
							)}
						</FormControl>
						<FormControl mr="5%">
							<FormLabel htmlFor="bio" fontWeight={'normal'}>
								Bio
							</FormLabel>
							<Textarea
								id="bio"
								placeholder="Author Name"
								{...register('bio', {
									value: author?.bio || null,
								})}
							/>
							{(errors as any)?.bio && (
								<FormHelperText color={'red'}>
									{(errors as any)?.bio.message}
								</FormHelperText>
							)}
						</FormControl>
						<FormControl>
							<FormLabel htmlFor="userId" fontWeight={'normal'} mt="2%">
								User
							</FormLabel>
							<Select
								id="userId"
								placeholder="Select a user to connect the author to..."
								{...register('userId', {
									value: author?.user?.id || null,
								})}
							>
								{usersQuery?.result.map((user: User) => {
									return (
										<option key={user.id} value={user.id}>
											{user.userName}
										</option>
									);
								})}
							</Select>
							{(errors as any)?.userId && (
								<FormHelperText color={'red'}>
									{(errors as any)?.userId.message}
								</FormHelperText>
							)}
						</FormControl>
						<Flex w={'full'} justifyContent="flex-end">
							<Button
								w="7rem"
								marginTop={10}
								colorScheme="green"
								variant="solid"
								type="submit"
							>
								Submit
							</Button>
						</Flex>
					</form>
				)}
			</Box>
		</>
	);
}
