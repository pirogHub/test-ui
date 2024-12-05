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

	fetchFilteredRows: async (): Promise<any[]> => {
		const response = await axios.get<any[]>('/api/fetch-filtered-rows');

		if (response.status !== 200) {
			throw new Error('user error');
		}
		return response.data;
	},
};
