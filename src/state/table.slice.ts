import {PayloadAction, configureStore, createSlice} from '@reduxjs/toolkit';

import {StatusTypes} from '@/shared/ui/status-badge/badge-status';

function deepMerge(target: any, source: any, depth: number = 5): any {
	if (depth === 0 || typeof target !== 'object' || typeof source !== 'object') {
		return target || source; // На максимальной глубине перезаписываем значение
	}

	console.log('----');

	console.log(`- ${5 - depth} SOURCE`, source);
	const isArray = Array.isArray(target);

	const result = isArray ? [...target] : {};
	console.log(`- ${5 - depth} target RESULT`, result);
	console.log('TARGET', isArray, target);

	for (const key of Object.keys(source)) {
		console.log(`- ${5 - depth} key`, key, 'SOURCE', source);

		if (key in target) {
			result[key] = deepMerge(target[key], source[key], depth - 1);
		} else {
			result[key] = source[key];
		}
	}
	console.log(`- ${5 - depth} RESULT`, result);

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

type DateRange = {
	start: Date | null;
	end: Date | null;
};

type FiltersState = {
	filters: {
		type: string[];
		status: StatusTypes[]; // Можно уточнить типы, если известно больше вариантов
		executor: string[];
	};
	filteredRows: unknown[]; // TODO
};

const initialState: FiltersState = {
	// search: '',
	filters: {
		status: [],
		type: [],
		// dateRange: {start: null, end: null},
		executor: [],
	},
	filteredRows: [],
};

// Слайс для фильтров
const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setStatus: (state, action: PayloadAction<FiltersState['filters']['status']>) => {
			console.log('redux set status');

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
	},
	extraReducers: (builder) => {
		builder.addCase('persist/REHYDRATE', (state, action) => {
			console.log('persist/REHYDRATE');
			const incomingState = action.payload?.table || {};
			console.log('start', initialState);

			const result = deepMerge(incomingState, initialState, 5);
			console.log('end', result);
			return result;
		});
	},
});

export const {setStatus, setType, setExecutors, setFilteredRows} = tableSlice.actions;
export const tableActions = tableSlice.actions;

export const tableReducer = tableSlice.reducer;
