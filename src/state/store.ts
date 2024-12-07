// Использует localStorage
import {useDispatch, useSelector} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import {proposalReducer} from './proposal.slice';
import {queryObjectMiddleware} from './table.middleware';
import {tableReducer} from './table.slice';
import {userReducer} from './user.slice';

const createNoopStorage = () => {
	return {
		getItem(_key: string) {
			return Promise.resolve(null);
		},
		setItem(_key: string, value: string) {
			return Promise.resolve(value);
		},
		removeItem(_key: string) {
			return Promise.resolve();
		},
	};
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// Конфигурация для redux-persist
const persistConfig = {
	key: 'root', // Ключ для хранилища
	storage, // Используем localStorage
	whitelist: ['table'],
};

// Комбинированный редьюсер
const rootReducer = combineReducers({
	table: tableReducer,
	user: userReducer,
	proposal: proposalReducer,
});
// Оборачиваем редьюсер для сохранения
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Создаем store с persistedReducer
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Игнорируем эти действия
			},
		}).prepend(queryObjectMiddleware.middleware),
	//.concat(queryObjectMiddleware),
});

// Экспорт persistor для управления состоянием
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
