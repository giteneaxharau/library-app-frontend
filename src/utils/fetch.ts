import axios from 'axios';
import { QueryClient } from 'react-query';
import { Params } from 'react-router-dom';
import { Author } from '../types/Author';
import { Book } from '../types/Book';
import { Category } from '../types/Category';

interface FetchOptions {
	get: (url: string, config?: any) => Promise<any>;
	post: (url: string, params?: any, config?: any) => Promise<any>;
	put: (url: string, params?: any, config?: any) => Promise<any>;
	delete: (url: string, config?: any) => Promise<any>;
}

export type Data = {
	errorMessages: string[];
	isSuccess: boolean;
	statusCode: number;
	result: any | null;
};

const port = 5208;
let baseURL = `https://library-app.azurewebsites.net/api/v1`;
if (import.meta.env.DEV) {
	baseURL = `http://localhost:${port}/api/v1`;
}

const API: FetchOptions = {
	get: async (url, config) => {
		try {
			const response = await axios.get(baseURL + url, config);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	post: async (url, params, config) => {
		try {
			const response = await axios.post(baseURL + url, params, config);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	put: async (url, params, config) => {
		try {
			const response = await axios.put(baseURL + url, params, config);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
	delete: async (url, config) => {
		try {
			const response = await axios.delete(baseURL + url, config);
			return response.data;
		} catch (error) {
			throw error;
		}
	},
};

export default API;
