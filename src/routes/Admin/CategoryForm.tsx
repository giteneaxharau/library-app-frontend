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
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Author } from '../../types/Author';
import { Book, bookCreateSchema, bookUpdateSchema } from '../../types/Book';
import { Select as ExtraSelect } from 'chakra-react-select';
import {
	Category,
	categoryCreateSchema,
	categoryUpdateSchema,
} from '../../types/Category';
import API, { Data } from '../../utils/fetch';

export default function CategoryForm() {
	const loader = useLoaderData() as Data;
	const result = loader?.result || null;
	const query = useLocation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const category: Category | null = query.state || null;
	const { data: bookQuery } = useQuery(
		'books',
		async () => await API.get('/books')
	);
	const { mutateAsync } = useMutation({
		mutationFn: async (data: any) => {
			if (category) {
				return await API.put(`/categories/${data.id}`, data, {
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem('token')}`,
					},
				});
			} else {
				return await API.post('/categories', data, {
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem('token')}`,
					},
				});
			}
		},
		onSuccess(data, variables, context) {
			toast({
				title:
					'Category ' + (category ? 'updated' : 'created') + ' successfully.',
				description: `We've ${
					category ? 'updated' : 'created'
				} your category for you.`,
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
		},
		onError(error, variables, context) {
			toast({
				title:
					'Category ' +
					(category ? 'updated' : 'created') +
					' not succesfully.',
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
		resolver: zodResolver(
			category ? categoryUpdateSchema : categoryCreateSchema
		),
	});
	console.log(errors);
	const toast = useToast();

	const categoryService = async (data: any, e: any) => {
		e.preventDefault();
		const categoryEntity = {
			...data,
			priority: parseInt(data.priority) || 0,
			books:
				data?.books
					?.map((x: any) => {
						const book = bookQuery?.result?.find((y: Book) => y.id === x.value);
						if (book)
							return {
								id: book.id,
								name: book.name,
								description: book.description,
								author: book.author,
								images: book.image,
							};
						else return null;
					})
					.filter(Boolean) || null,
		};
		await mutateAsync(categoryEntity);
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
				{!category && query.pathname.split('/')[3] === 'update' ? (
					<FormControl>
						<FormLabel htmlFor="categories" fontWeight={'normal'} mt="2%">
							Select a category to update
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
							placeholder="Select one of these categories..."
							closeMenuOnSelect={false}
							hasStickyGroupHeaders
						/>
					</FormControl>
				) : (
					<form onSubmit={handleSubmit(categoryService)}>
						<Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
							{category ? 'Update Category' : 'Create Category'}
						</Heading>
						<Flex>
							{category && (
								<Input
									type={'hidden'}
									id="id"
									{...register('id', {
										value: category?.id || null,
									})}
								/>
							)}
							<FormControl mr="5%">
								<FormLabel htmlFor="name" fontWeight={'normal'}>
									Name
								</FormLabel>
								<Input
									id="name"
									placeholder="Category Name"
									type={'text'}
									{...register('name', {
										value: category?.name || null,
									})}
								/>
								{(errors as any)?.name && (
									<FormHelperText color={'red'}>
										{(errors as any)?.name.message}
									</FormHelperText>
								)}
							</FormControl>
							<FormControl mr="5%">
								<FormLabel htmlFor="priority" fontWeight={'normal'}>
									Priority
								</FormLabel>
								<NumberInput
									id="priority"
									step={1}
									max={10}
									min={0}
									placeholder="priority"
									onChange={(e) => setValue('priority', e)}
								>
									<NumberInputField
										{...register('priority', {
											value: category?.priority || null,
											valueAsNumber: true,
										})}
									/>
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
								{(errors as any)?.name && (
									<FormHelperText color={'red'}>
										{(errors as any)?.priority.message}
									</FormHelperText>
								)}
							</FormControl>
						</Flex>

						<Controller
							control={control}
							name="books"
							defaultValue={category?.books?.map((category: any) => ({
								label: category.name,
								value: category.id,
							}))}
							rules={{ required: false }}
							render={({
								field: { onChange, ref, value, name, onBlur },
								fieldState: { error },
							}) => {
								return (
									<FormControl isInvalid={!!error}>
										<FormLabel htmlFor="books" fontWeight={'normal'} mt="2%">
											Books
										</FormLabel>
										<ExtraSelect
											id="books"
											isMulti
											ref={ref}
											name={name}
											value={value}
											onChange={onChange}
											onBlur={onBlur}
											options={bookQuery?.result.map((book: Book) => ({
												label: book.name,
												value: book.id,
											}))}
											isSearchable
											placeholder="Select books in this category(optional)..."
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
