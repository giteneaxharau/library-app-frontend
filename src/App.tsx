import Header from './components/Header/Header';
import Layout from './components/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import ErrorPage from './routes/ErrorPage';

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
]);

export default function App() {
	return (
		<RouterProvider router={router} />
		// <div className="App">
		// 	<Layout>asdas</Layout>
		// </div>
	);
}
