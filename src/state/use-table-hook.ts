import {useEffect, useMemo, useRef, useState} from 'react';

import {api} from '@/api/base';
import {bindActionCreators} from 'redux';

import {useNormalQuery} from '@/shared/hooks/use-normal-query';

import {useAppDispatch, useAppSelector} from './store';
import {tableActions} from './table.slice';

const createQueryParamsFromFilter = (filters: Record<string, unknown>) => {
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

// const fetcher = async (options) => {
// 	console.log('options', options);

// 	const res = await api.fetchFilteredRows(options.queryKey[0]);

// 	if (res.type === 'success') {
// 		return res.data;
// 	} else {
// 		return data;
// 	}
// };

const getSelectedKeysArray = (data: Record<string, boolean | undefined>) => {
	const selectedKeys = Object.entries(data).reduce((acc, [key, val]) => {
		if (val) {
			acc.push(key);
		}
		return acc;
	}, [] as string[]);

	return selectedKeys?.length ? selectedKeys : null;
};

export const useTableStore = () => {
	const dispatch = useAppDispatch();

	const handlers = useMemo(
		() => bindActionCreators({...tableActions}, dispatch),

		[dispatch],
	);

	const {setFilteredRows} = handlers;

	// const queryClient = useQueryClient();

	// const queryKey = ['table-filtered-rows'];

	const tableData = useAppSelector((state) => state.table);

	// console.log(tableData);

	const {filters, showedFiltersOrder, sorting} = tableData;
	// const {executor, status, type} = filters;
	const filtersRef = useRef(filters);
	filtersRef.current = filters;

	const [fetchQuery, setFetchQuery] = useState(createQueryParamsFromFilter(filters));
	const fetchQueryRef = useRef(fetchQuery);
	fetchQueryRef.current = fetchQuery;

	const [isAutoUpdate, setIsAutoUpdate] = useState(false);

	const {
		isLoading: getFilteredRowsIsLoading,
		fetchByQuery,
		data,
		error: getFilteredRowsError,
		isSuccess: getFilteredRowsIsSuccess,
	} = useNormalQuery<Parameters<typeof api.fetchFilteredRows>[0], ReturnType<typeof api.fetchFilteredRows>>({
		// initialData: [],
		disableAutoFetchByChangedQueryKey: true,
		queryKey: fetchQuery,
		queryFn: api.fetchFilteredRows,
		fetchOnMount: false,
		onSuccess: (data) => {
			if (data.type === 'success') {
				// @ts-expect-error toremoveq
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				dispatch(setFilteredRows(data.data));
			} else {
				// return data;
			}
		},
		onError: () => {
			dispatch(setFilteredRows([]));
		},
	});

	const dataRef = useRef(data);
	dataRef.current = data;

	const fetchedRowsByFilters = useAppSelector((state) => state.table.fetchedRowsByFilters);

	useEffect(() => {
		// const notEmptyFilters = {
		// 	...(filters?.executor?.length ? {executor: filters.executor} : {}),
		// 	...(filters?.status?.length ? {status: filters.status} : {}),
		// 	...(filters?.type?.length ? {type: filters.type} : {}),
		// };
		// const newQuery = createQueryParamsFromFilter({filters: notEmptyFilters, sorting});
		// console.log('newQuery', {notEmptyFilters, sorting});
		// const ttt = Object.entries(filters.executor).reduce((acc, [key, val]) => {
		// 	if (val) {
		// 		acc.push(key);
		// 	}
		// 	return acc;
		// }, [] as string[]);

		// const e = getSelectedKeysArray(filters.executor);
		const notEmptyFilters = Object.entries(filters).reduce(
			(acc, [key, val]) => {
				const arr = getSelectedKeysArray(val);
				if (arr) {
					acc[key] = arr;
				}
				return acc;
			},
			{} as Record<string, string[]>,
		);

		const newQuery = createQueryParamsFromFilter({filters: notEmptyFilters, sorting});
		// const notEmptyFilters = {
		// 	...(filters?.executor?.length ? {executor: filters.executor} : {}),
		// 	...(filters?.status?.length ? {status: filters.status} : {}),
		// 	...(filters?.type?.length ? {type: filters.type} : {}),
		// };
		console.log('notEmptyFilters: ', notEmptyFilters);

		console.log('- new query prepare: ', newQuery);
		// setFetchQuery(newQuery);
	}, [filters, sorting]);

	useEffect(() => {
		console.log('- new query created newQuery');
	}, [fetchQuery]);

	return {
		data: {
			executor: filters.executor,
			status: filters.status,
			type: filters.type,
		},
		setters: useMemo(
			() => ({
				executor: handlers.setExecutors,
				status: handlers.setStatus,
				type: handlers.setType,
			}),
			[handlers],
		),
		setSorting: handlers.setSorting,
		setShowedFiltersOrder: handlers.setShowedFiltersOrder,

		showedFiltersOrder,
		sorting,
		getFilteredRowsError,
		getFilteredRowsIsLoading: getFilteredRowsIsLoading, // || isRowsLoading,
		fetchByFiltersForce: fetchByQuery,
		fetchedRowsByFilters,
		isAutoUpdate,
		setIsAutoUpdate,
	};
};
