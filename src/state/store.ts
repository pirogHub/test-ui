import {useDispatch, useSelector} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';

import {configureStore} from '@reduxjs/toolkit';

import {proposalReducer} from './proposal.slice';
import {tableReducer} from './table.slice';
import {userReducer} from './user.slice';

export const store = configureStore({
	reducer: {
		table: tableReducer,
		user: userReducer,
		proposal: proposalReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
