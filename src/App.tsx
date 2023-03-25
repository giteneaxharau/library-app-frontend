import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useQueryClient, QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/Layout';
import Home from './routes/Home';
import ErrorPage from './routes/ErrorPage';
import { AuthProvider } from './hooks/useAuth';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import AllCategories from './routes/Categories/AllCategories';
import CategoryBooks from './routes/Categories/CategoryBooks';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/categories',
		element: (
			<Layout>
				<AllCategories />
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
		path: '/books/:id',
		element: <Layout>Book</Layout>,
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
		</QueryClientProvider>
	);
}
