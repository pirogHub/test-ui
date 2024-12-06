import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {z} from 'zod';

import {StatusTypes} from '@/shared/ui/status-badge/badge-status';

import {
	FiltersNamesType,
	ProposalExecutorIdType,
	ProposalFilterRecordType,
	ProposalSetFilterActionType,
	ProposalStatusIdType,
	ProposalTypeIdType,
	TableFiltersState,
} from './types';

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

	showedFiltersOrder: [],
	fetchedRowsByFilters: [],
};

const createNewState = <KeysType extends string>({
	oldState,
	listForWork,
	stateForAll,
}: {
	oldState: ProposalFilterRecordType<KeysType>;
	listForWork: ProposalSetFilterActionType<KeysType>[0];
	stateForAll?: ProposalSetFilterActionType<KeysType>[1];
}): ProposalFilterRecordType<KeysType> => {
	const newTypeState = {...oldState};
	// const newList = action.payload[0];
	// const stateForAll = action.payload[1];

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
		setStatus: (
			state,
			// action: PayloadAction<[{key: ProposalStatusIdType; val: boolean}[], stateForAll?: true | false]>,
			action: PayloadAction<ProposalSetFilterActionType<ProposalStatusIdType>>,
		) => {
			// console.log('redux set status');
			state.filters.status = createNewState({
				oldState: state.filters.status,
				listForWork: action.payload[0],
				stateForAll: action.payload[1],
			});
			// const newStatus = {...state.filters.status};
			// const newList = action.payload[0];
			// const stateForAll = action.payload[1];
			// // if (stateForAll === false) {
			// // 	state.filters.status = {};
			// // 	return;
			// // }
			// newList.forEach(({id, val}) => {
			// 	newStatus[id] = stateForAll !== undefined ? stateForAll : val;
			// });
			// // state.filters.status = newStatus;

			// state.filters.status = newList.reduce(
			// 	(acc, {id, val}) => {
			// 		if (val) {
			// 			acc[id] = val;
			// 		}
			// 		return acc;
			// 	},
			// 	{} as FiltersState['filters']['status'],
			// );

			// const newState = Object.entries(action.payload).reduce(
			// 	(acc, [key, value]) => {
			// 		if (value) {
			// 			acc[key as ProposalStatusIdType] = value;
			// 		}
			// 		return acc;
			// 	},
			// 	{} as FiltersState['filters']['status'],
			// );

			// state.filters.status = newState;
		},
		setType: (
			state,
			//
			action: PayloadAction<ProposalSetFilterActionType<ProposalTypeIdType>>,
		) => {
			state.filters.type = createNewState({
				oldState: state.filters.type,
				listForWork: action.payload[0],
				stateForAll: action.payload[1],
			});
			// const newTypeState = {...state.filters.type};
			// const newList = action.payload[0];
			// const stateForAll = action.payload[1];

			// newList.forEach(({id, val}) => {
			// 	newTypeState[id] = stateForAll !== undefined ? stateForAll : val;
			// });

			// state.filters.type = Object.entries(newTypeState).reduce(
			// 	(acc, [key, val]) => {
			// 		if (val) {
			// 			acc[key as ProposalTypeIdType] = val;
			// 		}
			// 		return acc;
			// 	},
			// 	{} as FiltersState['filters']['type'],
			// );

			// state.filters.type = newStatus;
			// const newStatus = {...state.filters.type};
			// action.payload.forEach(({key, val}) => {
			// 	newStatus[key] = val;
			// });
			// state.filters.type = newStatus;
			// const newState = Object.entries(action.payload).reduce(
			// 	(acc, [key, value]) => {
			// 		if (value) {
			// 			acc[key as ProposalTypeIdType] = value;
			// 		}
			// 		return acc;
			// 	},
			// 	{} as FiltersState['filters']['type'],
			// );

			// state.filters.type = newState;
			// state.filters.type = action.payload;
		},
		setExecutors: (state, action: PayloadAction<ProposalSetFilterActionType<ProposalExecutorIdType>>) => {
			state.filters.executor = createNewState({
				oldState: state.filters.executor,
				listForWork: action.payload[0],
				stateForAll: action.payload[1],
			});
			// const newState = Object.entries(action.payload).reduce(
			// 	(acc, [key, value]) => {
			// 		if (value) {
			// 			acc[key] = value;
			// 		}
			// 		return acc;
			// 	},
			// 	{} as FiltersState['filters']['executor'],
			// );

			// state.filters.type = newState;
			// state.filters.executor = action.payload;
		},
		setShowedFiltersOrder: (
			state,
			action: PayloadAction<{data: TableFiltersState['showedFiltersOrder'][0]; clearAll?: boolean}>,
		) => {
			const {data, clearAll} = action.payload;
			if (clearAll) {
				state.showedFiltersOrder = [];
				return;
			}
			const index = state.showedFiltersOrder.findIndex((i) => i === data);
			if (index !== -1) {
				state.showedFiltersOrder.splice(index, 1);
			} else {
				state.showedFiltersOrder.push(data);
			}
			// state.showedFiltersOrder = action.payload;
		},
		setFilteredRows: (state, action: PayloadAction<TableFiltersState['fetchedRowsByFilters']>) => {
			state.fetchedRowsByFilters = action.payload;
		},
		setSorting: (state, action: PayloadAction<TableFiltersState['sorting']>) => {
			// action.payload?.forEach(([fieldName, direction ]) => {
			// 	const
			// })
			state.sorting = action.payload?.filter((i) => i[1] !== undefined) || [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase('persist/REHYDRATE', (state, action) => {
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
		});
	},
});

export const {setStatus, setType, setExecutors, setFilteredRows} = tableSlice.actions;
export const tableActions = tableSlice.actions;

export const tableReducer = tableSlice.reducer;
