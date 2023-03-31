import {
	Box,
	Button,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Select,
	Textarea,
	useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueries, useQueryClient } from 'react-query';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Author } from '../../types/Author';
import { Book, bookCreateSchema, bookUpdateSchema } from '../../types/Book';
import { Select as ExtraSelect } from 'chakra-react-select';
import { Category } from '../../types/Category';
import API, { Data } from '../../utils/fetch';

export default function BookForm() {
	const loader = useLoaderData() as Data;
	const result = loader?.result || null;
	const query = useLocation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutateAsync } = useMutation({
		mutationFn: async (data: any) => {
			if (book) {
				return await API.put(`/books/${data.id}`, data, {
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem('token')}`,
					},
				});
			} else {
				return await API.post('/books', data, {
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem('token')}`,
					},
				});
			}
		},
		onSuccess(data, variables, context) {
			toast({
				title: 'Book ' + (book ? 'updated' : 'created') + ' successfully.',
				description: `We've ${book ? 'updated' : 'created'} your book for you.`,
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
		},
		onError(error, variables, context) {
			toast({
				title: 'Book ' + (book ? 'updated' : 'created') + ' not succesfully.',
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
	const book: Book | null = query.state || null;
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
		watch,
		control,
	} = useForm({
		resolver: zodResolver(book ? bookUpdateSchema : bookCreateSchema),
	});
	const toast = useToast();
	const images = watch('images');
	const [authorsQuery, categoriesQuery] = useQueries([
		{
			queryKey: 'authors',
			queryFn: () => API.get('/authors'),
		},
		{
			queryKey: 'categories',
			queryFn: () => API.get('/categories'),
		},
	]);
	const isLoading = authorsQuery.isLoading || categoriesQuery.isLoading;

	const bookService = async (data: any, e: any) => {
		e.preventDefault();
		const bookEntity: any = {
			...data,
			categories: data.categories
				.map((x: any) => {
					const category = categoriesQuery.data.result.find(
						(c: Category) => c.id === x.value
					);
					if (category)
						return {
							id: category.id,
							name: category.name,
							priority: category.priority,
						};
					else return null;
				})
				.filter(Boolean),
		};
		await mutateAsync(bookEntity).then((res) => {
			if ((res.statusCode === 204 || res.statusCode === 201) && images) {
				API.post(
					`/books/uploadimage`,
					{
						Image: images.item(0),
						Id: res.result.id,
					},
					{
						headers: {
							Authorization: `Bearer ${sessionStorage.getItem('token')}`,
							'Content-Type': 'multipart/form-data',
						},
					}
				);
			}
		});
	};
	if (isLoading) return <div>Loading...</div>;
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
				{!book && query.pathname.split('/')[3] === 'update' ? (
					<FormControl>
						<FormLabel htmlFor="categories" fontWeight={'normal'} mt="2%">
							Select a book to update
						</FormLabel>
						<ExtraSelect
							name={'bookSelect'}
							onChange={(e) =>
								navigate('', {
									state: (e as any).value,
								})
							}
							options={result?.map((x: Book) => {
								return {
									value: x,
									label: x.name,
								};
							})}
							isSearchable
							placeholder="Select one of the  books"
							closeMenuOnSelect={false}
							hasStickyGroupHeaders
						/>
					</FormControl>
				) : (
					<form onSubmit={handleSubmit(bookService)}>
						<Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
							{book ? 'Update Book' : 'Create Book'}
						</Heading>
						<Flex>
							{book && (
								<Input
									type={'hidden'}
									id="id"
									placeholder="Book Name"
									{...register('id', {
										value: book?.id || null,
									})}
								/>
							)}
							<FormControl mr="5%">
								<FormLabel htmlFor="name" fontWeight={'normal'}>
									Name
								</FormLabel>
								<Input
									id="name"
									placeholder="Book Name"
									{...register('name', {
										value: book?.name || null,
									})}
								/>
								{(errors as any)?.name && (
									<FormHelperText color={'red'}>
										{(errors as any)?.name.message}
									</FormHelperText>
								)}
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="authorId" fontWeight={'normal'}>
									Author
								</FormLabel>
								<Select
									variant="filled"
									id="authorId"
									{...register('authorId', {
										required: true,
										value: book?.author.id || null,
									})}
								>
									{authorsQuery.data?.result.map((author: Author) => {
										return (
											<option key={author.id} value={author.id}>
												{author.name}
											</option>
										);
									})}
								</Select>
								{(errors as any)?.authorId && (
									<FormHelperText color={'red'}>
										{(errors as any)?.authorId.message}
									</FormHelperText>
								)}
							</FormControl>
						</Flex>
						<FormControl mt="2%">
							<FormLabel htmlFor="description" fontWeight={'normal'}>
								Description
							</FormLabel>
							<Textarea
								id="description"
								placeholder="Enter this book's description"
								{...register('description', {
									value: book?.description || null,
								})}
							/>
							{(errors as any)?.description && (
								<FormHelperText color={'red'}>
									{(errors as any)?.description.message}
								</FormHelperText>
							)}
						</FormControl>
						<Controller
							control={control}
							name="categories"
							defaultValue={book?.categories.map((category: any) => ({
								label: category.name,
								value: category.id,
							}))}
							render={({
								field: { onChange, ref, value, name, onBlur },
								fieldState: { error },
							}) => {
								return (
									<FormControl isInvalid={!!error}>
										<FormLabel
											htmlFor="categories"
											fontWeight={'normal'}
											mt="2%"
										>
											Categories
										</FormLabel>
										<ExtraSelect
											isMulti
											ref={ref}
											name={name}
											value={value}
											onChange={onChange}
											onBlur={onBlur}
											options={categoriesQuery.data?.result.map(
												(category: Category) => ({
													label: category.name,
													value: category.id,
												})
											)}
											isSearchable
											placeholder="Select some categories..."
											closeMenuOnSelect={false}
											hasStickyGroupHeaders
										/>
										{error && (
											<FormHelperText color={'red'}>
												{error.message}
											</FormHelperText>
										)}
									</FormControl>
								);
							}}
						/>
						<FormControl mt="2%">
							<FormLabel htmlFor="description" fontWeight={'normal'}>
								Image
							</FormLabel>
							<Input
								id="description"
								type="file"
								placeholder="Enter this book's description"
								{...register('images', { value: book?.images || null })}
							/>
							{(errors as any)?.images && (
								<FormHelperText color={'red'}>
									{(errors as any)?.images.message}
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
