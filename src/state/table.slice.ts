import {PayloadAction, configureStore, createSlice} from '@reduxjs/toolkit';

import {StatusTypes} from '@/shared/ui/status-badge/badge-status';

type DateRange = {
	start: Date | null;
	end: Date | null;
};

type FiltersState = {
	type: string[];
	status: StatusTypes[]; // Можно уточнить типы, если известно больше вариантов
	executors: string[];
	filteredRows: unknown[]; // TODO
};

const initialState: FiltersState = {
	// search: '',
	status: [],
	type: [],
	// dateRange: {start: null, end: null},
	executors: [],
	filteredRows: [],
};

// Слайс для фильтров
const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setStatus: (state, action: PayloadAction<FiltersState['status']>) => {
			state.status = action.payload;
		},
		setType: (state, action: PayloadAction<FiltersState['type']>) => {
			state.type = action.payload;
		},
		setExecutors: (state, action: PayloadAction<FiltersState['executors']>) => {
			state.executors = action.payload;
		},
		setFilteredRows: (state, action: PayloadAction<FiltersState['filteredRows']>) => {
			state.filteredRows = action.payload;
		},
	},
});

export const {setStatus, setType, setExecutors, setFilteredRows} = tableSlice.actions;
export const tableActions = tableSlice.actions;

export const tableReducer = tableSlice.reducer;
