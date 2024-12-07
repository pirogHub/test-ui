import {MyBaseApi} from '@/api/base';
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {set, z} from 'zod';

import {StatusTypes} from '@/shared/ui/status-badge/badge-status';

import {fetchRowsByQuery} from './table.asyncthunk';
import {
	FiltersNamesType,
	ProposalExecutorIdType,
	ProposalFilterRecordType,
	ProposalQueryObjectType,
	ProposalSetFilterActionType,
	ProposalSortingItem,
	ProposalStatusIdType,
	ProposalTypeIdType,
	TableFiltersState,
} from './types';

const getSelectedKeysArray = (data: Record<string, boolean | undefined>) => {
	const selectedKeys = Object.entries(data).reduce((acc, [key, val]) => {
		if (val) {
			acc.push(key);
		}
		return acc;
	}, [] as string[]);

	return selectedKeys?.length ? selectedKeys : null;
};

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

function deepMerge(target: unknown, source: unknown, depth: number = 5): unknown {
	if (depth === 0 || !source || !target || typeof target !== 'object' || typeof source !== 'object') {
		return target || source; // На максимальной глубине перезаписываем значение
	}

	// console.log('----');

	// console.log(`- ${5 - depth} SOURCE`, source);
	const isArray = Array.isArray(target);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const result = isArray ? [...target] : {};
	// console.log(`- ${5 - depth} target RESULT`, result);
	// console.log('TARGET', isArray, target);

	for (const key of Object.keys(source)) {
		// console.log(`- ${5 - depth} key`, key, 'SOURCE', source);

		if (key in target) {
			// @ts-expect-error toremove
			result[key] = deepMerge(target[key], source[key], depth - 1);
		} else {
			// @ts-expect-error toremove
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			result[key] = source[key];
		}
	}
	// console.log(`- ${5 - depth} RESULT`, result);

	return result;
}

type ValidatorsType = {
	type?: (i: string) => boolean;
	status?: (i: StatusTypes) => boolean;
	executor?: (i: string) => boolean;
	sorting?: (i: string) => boolean;
};
// const validatorMap: ValidatorsType = {
// 	type: (i) => TypesSChema.safeParse(i).success,
// 	status: (i) => StatusTypesSchema.safeParse(i).success,
// };

const initialState: TableFiltersState = {
	filters: {
		status: {},
		type: {},
		executor: {},
	},
	sorting: [],

	//
	queryObject: {},
	prevQueryObjectString: '',
	//
	showedFiltersOrder: [],
	fetchRowState: {
		fetchedRowsIsLoading: false,
		fetchedRowsByFilters: [],
		fetchedRowsError: null,
	},
};

const createNewFilterState = <KeysType extends string>({
	oldState,
	listForWork,
	stateForAll,
}: {
	oldState: ProposalFilterRecordType<KeysType>;
	listForWork: ProposalSetFilterActionType<KeysType>[0];
	stateForAll?: ProposalSetFilterActionType<KeysType>[1];
}): ProposalFilterRecordType<KeysType> => {
	const newTypeState = {...oldState};

	if (listForWork.length === 0 && stateForAll == false) {
		return {} as ProposalFilterRecordType<KeysType>;
	}

	listForWork.forEach(({id, val}) => {
		newTypeState[id] = stateForAll !== undefined ? stateForAll : val;
	});

	return Object.entries<boolean | undefined>(newTypeState).reduce((acc, [key, val]) => {
		if (val) {
			acc[key as KeysType] = val;
		}
		return acc;
	}, {} as ProposalFilterRecordType<KeysType>);
};

// Слайс для фильтров
const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setStatus: (state, action: PayloadAction<ProposalSetFilterActionType<ProposalStatusIdType>>) => {
			state.filters.status = createNewFilterState({
				oldState: state.filters.status,
				listForWork: action.payload[0],
				stateForAll: action.payload[1],
			});
		},
		setType: (state, action: PayloadAction<ProposalSetFilterActionType<ProposalTypeIdType>>) => {
			state.filters.type = createNewFilterState({
				oldState: state.filters.type,
				listForWork: action.payload[0],
				stateForAll: action.payload[1],
			});
		},
		setExecutors: (state, action: PayloadAction<ProposalSetFilterActionType<ProposalExecutorIdType>>) => {
			state.filters.executor = createNewFilterState({
				oldState: state.filters.executor,
				listForWork: action.payload[0],
				stateForAll: action.payload[1],
			});
		},
		setShowedFiltersOrder: (
			state,
			action: PayloadAction<{data: TableFiltersState['showedFiltersOrder'][0] | null; clearAll?: boolean}>,
		) => {
			const {data, clearAll} = action.payload;
			if (clearAll) {
				state.showedFiltersOrder = [];
				return;
			}
			if (!data) return;
			const index = state.showedFiltersOrder.findIndex((i) => i === data);
			if (index !== -1) {
				state.showedFiltersOrder.splice(index, 1);
			} else {
				state.showedFiltersOrder.push(data);
			}
		},
		// setFilteredRows: (state, action: PayloadAction<TableFiltersState['fetchedRowsByFilters']>) => {
		// 	state..fetchedRowsByFilters = action.payload;
		// },
		setSorting: (state, action: PayloadAction<TableFiltersState['sorting']>) => {
			state.sorting = action.payload?.filter((i) => i[1] !== undefined) || [];
		},
		setQueryObject: (state) => {
			const notEmptyFilters = Object.entries(state.filters).reduce(
				(acc, [key, val]) => {
					const arr = getSelectedKeysArray(val);
					if (arr) {
						acc[key] = arr;
					}
					return acc;
				},
				{} as Record<string, string[]>,
			);

			const definedSorting = !state.sorting
				? []
				: state.sorting.reduce(
						(acc, [colName, direction]) => {
							if (direction) {
								acc.push([colName, direction]);
							}
							return acc;
						},
						[] as [ProposalSortingItem[0], Exclude<ProposalSortingItem[1], undefined>][],
					);
			state.queryObject = {filters: notEmptyFilters, ...(definedSorting.length ? {sorting: definedSorting} : {})};
			console.log('state.queryObject', state.queryObject);
		},
		// fetchRowsByQuery: (
		// 	state,
		// 	action: PayloadAction<{testData?: string; manualQueryObject?: ProposalQueryObjectType}>,
		// ) => {
		// 	console.log('fetchRowsByQuery: ', action.payload.testData);
		// 	const queryString = createQueryParamsFromQueryObject(
		// 		action.payload?.manualQueryObject || state.queryObject,
		// 	);

		// 	// fetchLogic

		// 	// state.fetchedRowsByFilters = suc;
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase('persist/REHYDRATE', (state, action) => {
				// console.log('persist/REHYDRATE');
				const typedAction = action as PayloadAction<{table: TableFiltersState}>;
				const incomingState = typedAction.payload?.table || {};
				// console.log('start', initialState);

				const result = deepMerge(incomingState, initialState, 5) as TableFiltersState;

				result.sorting = incomingState.sorting || [];

				const filtersKeys = Object.keys(result.filters) as FiltersNamesType[];
				// for (const filterKey of filtersKeys) {
				// 	const validator = validatorMap?.[filterKey] as (i: string) => boolean;
				// 	if (validator && result.filters[filterKey].length) {
				// 		// @ts-expect-error it will be the same types because filterKey is the same
				// 		result.filters[filterKey] = result.filters[filterKey].filter(validator);
				// 	}
				// }

				// if (result.showedFiltersOrder.length) {
				// 	result.showedFiltersOrder = result.showedFiltersOrder.filter((i) => {
				// 		return result.filters[i].length && result.filters[i].length > 0;
				// 	});
				// }

				return result;
			})
			.addCase(fetchRowsByQuery.pending, (state) => {
				state.fetchRowState.fetchedRowsIsLoading = true;
				state.fetchRowState.fetchedRowsError = null;
			})
			.addCase(fetchRowsByQuery.fulfilled, (state, action) => {
				state.fetchRowState.fetchedRowsIsLoading = false;
				state.fetchRowState.fetchedRowsError = null;
				if (action.payload.isQueryStringTheSame) return; // TODO чтобы даже pending не вызывался
				state.fetchRowState.fetchedRowsByFilters = action.payload.data;
				state.prevQueryObjectString = action.payload.prevQueryObjectString;
			})
			.addCase(fetchRowsByQuery.rejected, (state, action) => {
				state.fetchRowState.fetchedRowsIsLoading = false;
				// state.fetchRowState.fetchedRowsError = action.payload;
				if (action.payload) {
					// Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
					state.fetchRowState.fetchedRowsError = action.payload;
				} else {
					state.fetchRowState.fetchedRowsError = action.error.message || 'Unknown error';
				}
				// console.error('Error fetching rows:', action.payload);
			});
	},
});

// export const {setStatus, setType, setExecutors, setFilteredRows} = tableSlice.actions;
export const tableActions = tableSlice.actions;

export const tableReducer = tableSlice.reducer;
