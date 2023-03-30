import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ErrorPage from './ErrorPage';

export default function Authorization({
	children,
}: {
	children: React.ReactNode;
}) {
	const location = useLocation();
	const pathname = location.pathname;
	console.log(pathname);
	const { authStatus, userJWT } = useAuth();
	const role = userJWT?.role;

	return (role === 'Author' &&
		(pathname === '/admin' || pathname === '/admin/books/create')) ||
		role === 'Admin' ? (
		<>{children}</>
	) : (
		<ErrorPage
			title="You are not authorized"
			description="You are not logged in as an admin or author to access this route. Login with your account and try again."
		/>
	);
}
