import { createContext, useContext, useMemo, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { registerSchema, User } from '../types/User';
import * as z from 'zod';
import API from '../utils/fetch';
import jwtDecode from 'jwt-decode';

interface AuthContext {
	user: User | null;
	signin: (
		username: string,
		password: string
	) => Promise<void | { error: string[] }>;
	signup: ({}: z.infer<typeof registerSchema>) => Promise<void | {
		error: string[];
	}>;
	signout: () => Promise<void>;
	authStatus: boolean;
	userJWT: UserJWT | null;
}

type UserJWT = {
	exp: number;
	iat: number;
	nbf: number;
	role: 'Admin' | 'Author';
	unique_name: string;
};

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

	const userJWT = useMemo(() => {
		if (authStatus) {
			const info: UserJWT = jwtDecode(sessionStorage.getItem('token') || '');
			return info;
		} else {
			return null;
		}
	}, [authStatus]);

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
	const signup = async ({
		email,
		password,
		role,
		userName,
		firstName,
		lastName,
	}: z.infer<typeof registerSchema>) => {
		return await API.post('/UserAuth/register', {
			email,
			password,
			role,
			userName,
			firstName,
			lastName,
		}).then(async (res) => {
			if (res.statusCode === 200) {
				console.log(res);
				await signin(userName, password).then((res) => {
					if (res.statusCode !== 201) return { err: res.errorMessages };
				});
			} else {
				return { error: res.errorMessages };
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
		userJWT,
	};
}
