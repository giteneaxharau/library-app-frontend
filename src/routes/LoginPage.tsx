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
} from '@chakra-ui/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../types/User';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LoginPage() {
	const navigate = useNavigate();
	const { signin } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
		watch,
	} = useForm({
		resolver: zodResolver(loginSchema),
	});

	const password = watch('password');

	useEffect(() => {
		if (password) {
			console.log('password: ', password);
			if (password.length < 6) {
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

	async function onSubmit(data: any, e: any) {
		e.preventDefault();
		await signin(data.userName, data.password).then((res) => {
			if (!!res?.error)
				setError(
					'root',
					{ type: 'manual', message: res?.error.join(',') },
					{ shouldFocus: true }
				);
			navigate('/');
		});
	}

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Sign in to your account</Heading>
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
							</FormControl>
							<FormControl id="password">
								<FormLabel>Password</FormLabel>
								<Input type="password" {...register('password')} />
								{errors && (
									<Text color="red.500">
										{(errors as any)['password']?.message}
									</Text>
								)}
							</FormControl>
							<Stack spacing={10}>
								<Stack
									direction={{ base: 'column', sm: 'row' }}
									align={'start'}
									justify={'space-between'}
								>
									<Checkbox>Remember me</Checkbox>
									<Link color={'blue.400'}>Forgot password?</Link>
								</Stack>
								<Button
									bg={'blue.400'}
									color={'white'}
									_hover={{
										bg: 'blue.500',
									}}
									type="submit"
								>
									Sign in
								</Button>
							</Stack>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
}
