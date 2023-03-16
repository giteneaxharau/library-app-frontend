import axios from 'axios';

interface FetchOptions {
	get: (url: string, params?: any) => Promise<any>;
	post: (url: string, params?: any) => Promise<any>;
	put: (url: string, params?: any) => Promise<any>;
	delete: (url: string, params?: any) => Promise<any>;
}

const port = 5208;
const baseURL = `http://localhost:${port}/api`;

const instance = axios.create({
	baseURL: baseURL,
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${sessionStorage.getItem('token')}`,
	},
});

export const fetch: FetchOptions = {
	get: async (url, params) => {
		try {
			const response = await instance.get(url, params);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	post: async (url, params) => {
		try {
			const response = await instance.post(url, params);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	put: async (url, params) => {
		try {
			const response = await instance.put(url, params);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	delete: async (url, params) => {
		try {
			const response = await instance.delete(url, params);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};
