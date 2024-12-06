import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {z} from 'zod';

import {StatusTypes} from '@/shared/ui/status-badge/badge-status';

const StatusTypesSchema = z.enum(['analyze', 'in-work', 'done', 'specified', 'rejected', 'waited', 'draft']);

const TypesSChema = z.enum(['inner', 'outer']);

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

// TODO validation when wrong val of field, for ex type: ['inner', 'Rdsfkjmsdg] {"table":"{\"filters\":{\"status\":[],\"type\":[\"inner\", \"outer\"],\"executor\":[]},\"filteredRows\":[{\"id\":1,\"createdAt\":1693573214000,\"appNumber\":\"APP001\",\"status\":\"analyze\",\"type\":\"inner\",\"executor\":\"Иван Иванов\"},{\"id\":3,\"createdAt\":1693773214000,\"appNumber\":\"APP003\",\"status\":\"done\",\"type\":\"inner\",\"executor\":\"Сергей Сергеев\"},{\"id\":5,\"createdAt\":1693973214000,\"appNumber\":\"APP005\",\"status\":\"rejected\",\"type\":\"inner\",\"executor\":\"Иван Иванов\"},{\"id\":7,\"createdAt\":1694173214000,\"appNumber\":\"APP007\",\"status\":\"draft\",\"type\":\"inner\",\"executor\":\"Сергей Сергеев\"},{\"id\":9,\"createdAt\":1694373214000,\"appNumber\":\"APP009\",\"status\":\"in-work\",\"type\":\"inner\",\"executor\":\"Николай Николаев\"}]}","_persist":"{\"version\":-1,\"rehydrated\":true}"}

// function deepMerge(obj1: any, obj2: any, depth: number = 5): any {
// 	const result: any = {};

// 	// Если достигнута максимальная глубина, просто копируем значения из obj1
// 	if (depth === 0) {
// 		return {...obj1};
// 	}

// 	// Проходим по всем ключам в первом объекте
// 	for (const key in obj1) {
// 		// Проверяем, есть ли этот ключ во втором объекте
// 		if (obj2.hasOwnProperty(key)) {
// 			// Если во втором объекте есть ключ, проверяем, не пустое ли его значение
// 			if (obj2[key] !== undefined && obj2[key] !== null) {
// 				// Если значения обоих объектов являются объектами, и мы не достигли максимальной глубины
// 				if (
// 					typeof obj2[key] === 'object' &&
// 					obj2[key] !== null &&
// 					typeof obj1[key] === 'object' &&
// 					obj1[key] !== null
// 				) {
// 					// Рекурсивно вызываем deepMerge с уменьшением глубины
// 					result[key] = deepMerge(obj1[key], obj2[key], depth - 1);
// 				} else {
// 					// Если значения не объекты, просто перезаписываем значение из obj2
// 					result[key] = obj2[key];
// 				}
// 			} else {
// 				// Если во втором объекте нет значения, оставляем значение из первого объекта
// 				result[key] = obj1[key];
// 			}
// 		} else {
// 			// Если во втором объекте нет этого ключа, оставляем значение из первого объекта
// 			result[key] = obj1[key];
// 		}
// 	}

// 	return result;
// }

// type DateRange = {
// 	start: Date | null;
// 	end: Date | null;
// };

type FiltersState = {
	filters: {
		type: string[];
		status: StatusTypes[]; // Можно уточнить типы, если известно больше вариантов
		executor: string[];
	};
	sorting?: [string, 'asc' | 'desc' | undefined][]; // TODO
	validators?: {
		type?: (i: string) => boolean;
		status?: (i: StatusTypes) => boolean;
		executor?: (i: string) => boolean;
		sorting?: (i: string) => boolean;
	};
	showedFiltersOrder: FiltersNamesType[];
	filteredRows: unknown[]; // TODO
};

type FiltersNamesType = keyof FiltersState['filters'];

const initialState: FiltersState = {
	filters: {
		status: [],
		type: [],
		executor: [],
	},
	sorting: [],
	validators: {
		type: (i) => TypesSChema.safeParse(i).success,
		status: (i) => StatusTypesSchema.safeParse(i).success,
		// executor?: (i) => ;
	},
	showedFiltersOrder: [],
	filteredRows: [],
};

// Слайс для фильтров
const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setStatus: (state, action: PayloadAction<FiltersState['filters']['status']>) => {
			// console.log('redux set status');

			state.filters.status = action.payload;
		},
		setType: (state, action: PayloadAction<FiltersState['filters']['type']>) => {
			state.filters.type = action.payload;
		},
		setExecutors: (state, action: PayloadAction<FiltersState['filters']['executor']>) => {
			state.filters.executor = action.payload;
		},
		setFilteredRows: (state, action: PayloadAction<FiltersState['filteredRows']>) => {
			state.filteredRows = action.payload;
		},
		setSorting: (state, action: PayloadAction<FiltersState['sorting']>) => {
			// action.payload?.forEach(([fieldName, direction ]) => {
			// 	const
			// })
			state.sorting = action.payload?.filter((i) => i[1] !== undefined) || [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase('persist/REHYDRATE', (state, action) => {
			// console.log('persist/REHYDRATE');
			const typedAction = action as PayloadAction<{table: FiltersState}>;
			const incomingState = typedAction.payload?.table || {};
			// console.log('start', initialState);

			const result = deepMerge(incomingState, initialState, 5) as FiltersState;

			result.sorting = incomingState.sorting || [];

			const filtersKeys = Object.keys(result.filters) as FiltersNamesType[];
			for (const filterKey of filtersKeys) {
				const validator = result.validators?.[filterKey] as (i: string) => boolean;
				if (validator && result.filters[filterKey].length) {
					// @ts-expect-error it will be the same types because filterKey is the same
					result.filters[filterKey] = result.filters[filterKey].filter(validator);
				}
			}

			if (result.showedFiltersOrder.length) {
				result.showedFiltersOrder = result.showedFiltersOrder.filter((i) => {
					return result.filters[i].length && result.filters[i].length > 0;
				});
			}

			return result;
		});
	},
});

export const {setStatus, setType, setExecutors, setFilteredRows} = tableSlice.actions;
export const tableActions = tableSlice.actions;

export const tableReducer = tableSlice.reducer;
