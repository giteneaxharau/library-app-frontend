import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useQueryClient, QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/Layout';
import Home from './routes/Home';
import ErrorPage from './routes/ErrorPage';
import { AuthProvider } from './hooks/useAuth';
import LoginPage from './routes/LoginPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/categories',
		element: <Layout>Categories</Layout>,
	},
	{
		path: '/categories/:id',
		element: <Layout>Category</Layout>,
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
