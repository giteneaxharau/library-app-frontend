import { createContext, useContext, useMemo, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { registerSchema, User } from '../types/User';
import * as z from 'zod';
import API from '../utils/fetch';

interface AuthContext {
	user: User | null;
	signin: (
		username: string,
		password: string
	) => Promise<void | { error: string[] }>;
	signup: ({}: z.infer<typeof registerSchema>) => void;
	signout: () => Promise<void>;
	authStatus: boolean;
}

const authContext = createContext<AuthContext>({} as AuthContext);

export const useAuth = () => {
	return useContext(authContext);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const auth = useProvideAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
	const [user, setUser] = useState<User | null>(null);
	const authStatus = useMemo(() => {
		return Boolean(sessionStorage.getItem('token'));
	}, [user]);

	const signin = async (userName: string, password: string) => {
		return API.post('/UserAuth/login', { userName, password }).then(
			async (res) => {
				if (res.statusCode === 200 && res.result.token !== null) {
					sessionStorage.setItem('token', res.result.token);
					setUser(res.result.user);
					return res.result.user;
				} else {
					return { error: res.errorMessages };
				}
			}
		);
	};
	const signup = ({
		email,
		password,
		role,
		userName,
		firstName,
		lastName,
	}: z.infer<typeof registerSchema>) => {
		API.post('/UserAuth/register', {
			email,
			password,
			role,
			userName,
			firstName,
			lastName,
		}).then(async (res) => {
			if (res.statusCode === 200) {
				console.log(res);
				await signin(userName, password);
			}
		});
	};
	const signout = async () => {
		await API.post('/UserAuth/logout', {
			token: sessionStorage.getItem('token'),
		});
	};
	return {
		user,
		signin,
		authStatus,
		signup,
		signout,
	};
}
