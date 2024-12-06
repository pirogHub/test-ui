import {User} from '@/state/types';
import axios from 'axios';

type LoginResponse = {
	token: string;
	user: User;
};

const apiClient = axios.create({
	baseURL: 'localhost:3000/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

// Перехватчик для добавления токенов
apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('authToken'); // Пример токена
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Запросы для двух разных ролей
export const api = {
	getUser: async (): Promise<User> => {
		const response = await axios.get<User>('/api/get-user');

		if (response.status !== 200) {
			throw new Error('user error');
		}

		return response.data;
	},

	login: async ({email, password}: {email: string; password: string}): Promise<LoginResponse> => {
		const response = await axios.post<LoginResponse>('/api/login', {email, password});

		if (response.status !== 200) {
			throw new Error('Login failed');
		}

		return response.data;
	},

	fetchFilteredRows: async (query: string): Promise<{type: 'success'; data: any} | {type: 'error'; data: any}> => {
		console.log('fetchFilteredRows');

		try {
			// console.log('query', query);

			// const response = await axios.get<any[]>('/api/fetch-filtered-rows' + query);
			const response = await axios.get<any[]>('/api/fetch-filtered-rows?' + query);

			if (response.status !== 200) {
				throw new Error('user error');
			}
			return {type: 'success', data: response.data};
		} catch (error) {
			console.error('Error fetching filtered rows:', error);
			// throw error;
			return {type: 'error', data: error};
		}
	},
	fetchExecutors: async (): Promise<{type: 'success'; data: string[]} | {type: 'error'; data: any}> => {
		try {
			// const response = await axios.get<any[]>('/api/fetch-filtered-rows' + query);
			const response = await axios.get<string[]>('/api/fetch-executors');

			if (response.status !== 200) {
				throw new Error('user error');
			}
			return {type: 'success', data: response.data};
		} catch (error) {
			console.error('Error fetching filtered rows:', error);
			// throw error;
			return {type: 'error', data: error};
		}
	},
};
