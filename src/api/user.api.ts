// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import axios from 'axios';

// // Импортируем экшен из слайса пользователя
// import {RootState} from './store';
// import {User} from './types';
// import {setUser} from './userSlice';

// // Для типизации

// type LoginResponse = {
// 	token: string;
// 	user: User;
// };

// const apiClient = axios.create({
// 	baseURL: 'http://localhost:3000/api', // Убедитесь, что baseURL корректен
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// });

// // Перехватчик для добавления токена в заголовок запросов
// apiClient.interceptors.request.use((config) => {
// 	const token = localStorage.getItem('authToken'); // Получаем токен из localStorage
// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`;
// 	}
// 	return config;
// });

// const axiosBaseQuery = ({url, method, data}: {url: string; method: string; data?: any}) => {
// 	return axios({
// 		url,
// 		method,
// 		data,
// 	})
// 		.then((response) => ({data: response.data}))
// 		.catch((error) => {
// 			return {error: error.response?.data || error.message};
// 		});
// };

// export const api = createApi({
// 	reducerPath: 'api',
// 	baseQuery: axiosBaseQuery,
// 	endpoints: (builder) => ({
// 		login: builder.mutation<LoginResponse, {email: string; password: string}>({
// 			query: ({email, password}) => ({
// 				url: '/login',
// 				method: 'POST',
// 				data: {email, password},
// 			}),
// 			// Используем onQueryStarted для автоматического вызова setUser при успешном логине
// 			onQueryStarted: async (args, {dispatch, queryFulfilled}) => {
// 				try {
// 					const {data} = await queryFulfilled; // Получаем данные после успешного запроса
// 					localStorage.setItem('authToken', data.token); // Сохраняем токен в localStorage
// 					dispatch(setUser(data.user)); // Обновляем состояние пользователя в Redux
// 				} catch (error) {
// 					console.error('Login failed:', error);
// 				}
// 			},
// 		}),

// 		getUser: builder.query<User, void>({
// 			query: () => ({
// 				url: '/user', // Здесь предполагается, что эндпоинт для получения пользователя доступен по '/user'
// 				method: 'GET',
// 			}),
// 		}),
// 	}),
// });

// export const {useLoginMutation, useGetUserQuery} = api;
