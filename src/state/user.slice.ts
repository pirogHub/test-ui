import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type User = {
	id: number;
	email: string;
	name: string;
	role: 'default' | 'analyst';
	avatar: string;
};

type UserDataState = {
	userData: User | null;
	isAuthenticated: boolean;
};

const initialState: UserDataState = {
	userData: null,
	isAuthenticated: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.userData = action.payload;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.userData = null;
			state.isAuthenticated = false;
			localStorage.removeItem('authToken');
		},
	},
});

export const {setUser, logout} = userSlice.actions;

export const userReducer = userSlice.reducer;
