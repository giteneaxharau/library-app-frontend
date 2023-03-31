import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { useQueryClient, QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/Layout';
import Home from './routes/Home';
import ErrorPage from './components/ErrorPage';
import { AuthProvider } from './hooks/useAuth';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import AllCategories from './routes/Categories/AllCategories';
import CategoryBooks from './routes/Categories/CategoryBooks';
import BookId from './routes/Admin/BookForm';
import { ReactQueryDevtools } from 'react-query/devtools';
import Authorization from './components/Authorization';
import Authors from './routes/Authors';
import Admin from './routes/Admin/Admin';
import API from './utils/fetch';
import Deletion from './routes/Admin/Deletion';
import CategoryForm from './routes/Admin/CategoryForm';
import AuthorForm from './routes/Admin/AuthorForm';
import ReportPage from './routes/Admin/ReportPage';
import { useEffect } from 'react';

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage title="An unexpected error has occurred" />,
	},
	{
		path: '/categories',
		element: (
			<Layout>
				<AllCategories />
				<Outlet />
			</Layout>
		),
	},
	{
		path: '/categories/:id',
		element: (
			<Layout>
				<CategoryBooks />
			</Layout>
		),
	},
	{
		path: '/admin',
		element: (
			<Authorization>
				<Layout>
					<Outlet />
				</Layout>
			</Authorization>
		),

		children: [
			{
				index: true,
				element: <Admin />,
			},
			{
				path: 'books/*',
				element: <Outlet />,

				children: [
					{
						path: 'update',
						element: <BookId />,
						loader: async () =>
							await queryClient.fetchQuery({
								queryKey: 'books',
								queryFn: () => API.get('/Books'),
							}),
					},
					{
						path: 'create',
						element: <BookId />,
					},
					{
						path: 'delete',
						element: <Deletion />,
						loader: async () =>
							await queryClient.fetchQuery({
								queryKey: 'books',
								queryFn: () => API.get('/Books'),
							}),
					},
				],
			},
			{
				path: 'categories/*',
				element: <Outlet />,
				children: [
					{
						path: 'update',
						element: <CategoryForm />,
						loader: async () =>
							await queryClient.fetchQuery({
								queryKey: 'categories',
								queryFn: () => API.get('/categories?include=true'),
							}),
					},
					{
						path: 'create',
						element: <CategoryForm />,
					},
					{
						path: 'delete',
						element: <Deletion />,
						loader: async () =>
							await queryClient.fetchQuery({
								queryKey: 'categories',
								queryFn: () => API.get('/categories'),
							}),
					},
				],
			},
			{
				path: 'authors/*',
				element: <Outlet />,
				children: [
					{
						path: 'update',
						element: <AuthorForm />,
						loader: async () =>
							await queryClient.fetchQuery({
								queryKey: 'authors',
								queryFn: () => API.get('/authors?include=true'),
							}),
					},
					{
						path: 'create',
						element: <AuthorForm />,
					},
					{
						path: 'delete',
						element: <Deletion />,
						loader: async () =>
							await queryClient.fetchQuery({
								queryKey: 'authors',
								queryFn: () => API.get('/authors'),
							}),
					},
				],
			},
			{
				path: 'report',
				element: <ReportPage />,
				loader: async () =>
					await queryClient.fetchQuery({
						queryKey: 'authors',
						queryFn: async () =>
							await API.get('/authors?include=true&orderByBooks=true'),
					}),
			},
		],
	},
	{
		path: '/authors',
		element: (
			<Layout>
				<Authors />
			</Layout>
		),
	},
	{
		path: '/authors/:id',
		element: (
			<Layout>
				<CategoryBooks />
			</Layout>
		),
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/register',
		element: (
			<Authorization>
				<RegisterPage />
			</Authorization>
		),
	},
]);

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
