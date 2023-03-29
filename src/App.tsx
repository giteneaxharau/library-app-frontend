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
import BookId from './routes/BookId';
import { ReactQueryDevtools } from 'react-query/devtools';
import Authorization from './components/Authorization';

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
				path: 'books/*',
				element: <BookId />,
			},
			{
				path: 'categories/*',
				element: <BookId />,
			},
			{
				path: 'authors/*',
				element: <BookId />,
			},
		],
	},
	{
		path: '/authors',
		element: <Layout>Authors</Layout>,
	},
	{
		path: '/authors/:id',
		element: <Layout>Author</Layout>,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/register',
		element: <RegisterPage />,
	},
]);
const queryClient = new QueryClient();

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
