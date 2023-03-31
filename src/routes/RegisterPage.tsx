import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Select,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema } from '../types/User';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function RegisterPage() {
	const navigate = useNavigate();
	const { signup } = useAuth();
	const [show, setShow] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
		watch,
	} = useForm({
		resolver: zodResolver(registerSchema),
	});

	const password = watch('password');

	async function onSubmit(data: any, e: any) {
		e.preventDefault();
		await signup({ ...data })
			.then((res) => {
				if (!!res?.error)
					setError(
						'root',
						{ type: 'manual', message: res?.error.join(',') },
						{ shouldFocus: true }
					);
			})
			.then(() => navigate('/'));
	}

	useEffect(() => {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/g;
		if (password) {
			if (!regex.test(password)) {
				setError(
					'password',
					{ type: 'manual', message: 'Password must be at least 6 characters' },
					{ shouldFocus: true }
				);
			} else {
				return clearErrors('password');
			}
		}
	}, [password]);

	// console.log('errors: ', errors);

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Register new account</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
					</Text>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={4}>
							{errors && <Text color="red.500">{errors.root?.message}</Text>}
							<FormControl id="username">
								<FormLabel>Username</FormLabel>
								<Input type="text" {...register('userName')} />
								{errors && (
									<Text color="red.500">
										{(errors as any)['userName']?.message}
									</Text>
								)}
							</FormControl>
							<FormControl id="email">
								<FormLabel>Email</FormLabel>
								<Input type="email" {...register('email')} />
								{errors && (
									<Text color="red.500">
										{(errors as any)['email']?.message}
									</Text>
								)}
							</FormControl>
							<FormControl id="firstName">
								<FormLabel>First Name</FormLabel>
								<Input type="text" {...register('firstName')} />
								{errors && (
									<Text color="red.500">
										{(errors as any)['firstName']?.message}
									</Text>
								)}
							</FormControl>
							<FormControl id="lastName">
								<FormLabel>Last Name</FormLabel>
								<Input type="text" {...register('lastName')} />
								{errors && (
									<Text color="red.500">
										{(errors as any)['lastName']?.message}
									</Text>
								)}
							</FormControl>
							<FormControl id="role">
								<FormLabel>Roles</FormLabel>
								<Select
									variant="filled"
									{...register('role', {
										required: true,
									})}
								>
									<option value="Admin">Admin</option>
									<option value="Author">Author</option>
								</Select>
								{errors && (
									<Text color="red.500">
										{(errors as any)['role']?.message}
									</Text>
								)}
							</FormControl>
							<FormControl id="password">
								<FormLabel>Password</FormLabel>
								<InputGroup size="md">
									<Input
										{...register('password')}
										pr="4.5rem"
										type={show ? 'text' : 'password'}
										placeholder="Enter password"
									/>
									<InputRightElement width="4.5rem">
										<Button
											h="1.75rem"
											size="sm"
											onClick={() => setShow((prev) => !prev)}
										>
											{show ? 'Hide' : 'Show'}
										</Button>
									</InputRightElement>
								</InputGroup>
								{errors && (
									<Text color="red.500">
										{(errors as any)['password']?.message}
									</Text>
								)}
							</FormControl>
							<Button
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
								type="submit"
							>
								Register
							</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
}
