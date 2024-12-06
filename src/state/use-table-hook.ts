import {use, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {api} from '@/api/base';
import {useQuery, useQueryClient} from '@tanstack/react-query';
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
			//  if (value && typeof value === 'object') {
			// 	newQuery.set(key, createQueryParamsFromFilter(value));
			// }
			newQuery.set(key, JSON.stringify(value));
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

export const useTableStore = () => {
	const dispatch = useAppDispatch();

	const handlers = useMemo(
		() => bindActionCreators({...tableActions}, dispatch),

		[dispatch],
	);

	const {setFilteredRows} = handlers;

	const queryClient = useQueryClient();

	const queryKey = ['table-filtered-rows'];

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
		// disableAutoFetchByChangedQueryKey: true,
		queryKey: fetchQuery,
		queryFn: api.fetchFilteredRows,
		fetchOnMount: false,
		onSuccess: (data) => {
			if (data.type === 'success') {
				dispatch(setFilteredRows(data.data));
			} else {
				// return data;
			}
		},
		onError: (error) => {
			dispatch(setFilteredRows([]));
		},
	});

	const dataRef = useRef(data);
	dataRef.current = data;

	const filteredRows = useAppSelector((state) => state.table.filteredRows);

	useEffect(() => {
		const notEmptyFilters = {
			...(filters?.executor?.length ? {executor: filters.executor} : {}),
			...(filters?.status?.length ? {status: filters.status} : {}),
			...(filters?.type?.length ? {type: filters.type} : {}),
		};
		const newQuery = createQueryParamsFromFilter({filters: notEmptyFilters, sorting});
		console.log('newQuery', {notEmptyFilters, sorting});

		setFetchQuery(newQuery);
	}, [filters, sorting]);

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

		showedFiltersOrder,
		sorting,
		getFilteredRowsError,
		getFilteredRowsIsLoading: getFilteredRowsIsLoading, // || isRowsLoading,
		fetchByFiltersForce: fetchByQuery,
		filteredRows,
		isAutoUpdate,
		setIsAutoUpdate,
	};
};
