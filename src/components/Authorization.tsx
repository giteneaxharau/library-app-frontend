import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ErrorPage from './ErrorPage';

export default function Authorization({
	children,
}: {
	children: React.ReactNode;
}) {
	const query = useLocation();
	const { authStatus } = useAuth();

	return authStatus ? (
		<>{children}</>
	) : (
		<ErrorPage
			title="You are not authorized"
			description="You are not logged in as an admin or author to access this route. Login with your account and try again."
		/>
	);
}
