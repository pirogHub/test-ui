import {MyBaseApi} from '@/api/base';
import {createAsyncThunk} from '@reduxjs/toolkit';

import {RootState} from './store';
import {ProposalQueryObjectType} from './types';

const createQueryParamsFromQueryObject = (filters: ProposalQueryObjectType) => {
	const newQuery = new URLSearchParams();
	Object.entries(filters).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			if (value.length) {
				newQuery.set(key, JSON.stringify(value));
			}
		} else if (value) {
			if (typeof value === 'object') {
				if (Object.keys(value).length) {
					newQuery.set(key, JSON.stringify(value));
				}
			} else {
				newQuery.set(key, JSON.stringify(value));
			}
		}
	});
	return newQuery.toString();
};

export const fetchRowsByQuery = createAsyncThunk<
	// Return type of the payload creator
	{data: unknown[]; prevQueryObjectString: string; isQueryStringTheSame?: boolean},
	// First argument to the payload creator
	{testData?: string; manualQueryObject?: ProposalQueryObjectType},
	// Types for ThunkAPI
	{
		rejectValue: string | null;
	}
>('table/fetchRowsByQuery', async (payload, thunkApi) => {
	try {
		const queryObj = payload.manualQueryObject;
		const {queryObject, prevQueryObjectString} = (thunkApi.getState() as RootState).table;

		let queryString = '';
		if (queryObj) {
			queryString = createQueryParamsFromQueryObject(queryObj);
		} else {
			queryString = createQueryParamsFromQueryObject(queryObject);
		}

		if (prevQueryObjectString === queryString) {
			return {data: [], prevQueryObjectString: queryString, isQueryStringTheSame: true};
		}
		const response = await MyBaseApi.fetchFilteredRows(queryString);

		if (response.type === 'error') {
			throw new Error(`Error: ${response.data as string}`);
		}

		return {data: response.data, prevQueryObjectString: queryString};
	} catch (error) {
		return thunkApi.rejectWithValue(error instanceof Error ? error.message : 'Unknown error fetchRowsByQuery');
	}
});
