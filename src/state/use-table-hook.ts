import {use, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {api} from '@/api/base';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {bindActionCreators} from 'redux';

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
			newQuery.set(key, JSON.stringify(value));
		}
	});
	return newQuery.toString();
};

const fetcher = async (options) => {
	console.log('options', options);

	const res = await api.fetchFilteredRows(options.queryKey[0]);

	if (res.type === 'success') {
		return res.data;
	} else {
		return data;
	}
};

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

	console.log(tableData);

	const {filters} = tableData;
	const {executor, status, type} = filters;
	const filtersRef = useRef(filters);
	filtersRef.current = filters;

	const [fetchQuery, setFetchQuery] = useState(createQueryParamsFromFilter(filters));
	const fetchQueryRef = useRef(fetchQuery);
	fetchQueryRef.current = fetchQuery;

	const [isAutoUpdate, setIsAutoUpdate] = useState(false);

	const {
		isLoading: getFilteredRowsIsLoading,
		refetch,
		data,
		error: getFilteredRowsError,
		isSuccess: getFilteredRowsIsSuccess,
	} = useQuery<unknown[], unknown, Parameters<typeof api.fetchFilteredRows>[0]>({
		// initialData: [],
		queryKey: [fetchQuery],
		queryFn: fetcher,
		retryOnMount: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		retry: 0,
		// enabled: isAutoUpdate,
		staleTime: 1000,
	});

	const [isRowsLoading, setIsRowsLoading] = useState(true);

	const dataRef = useRef(data);
	dataRef.current = data;

	useEffect(() => {
		if (getFilteredRowsIsLoading) {
			setIsRowsLoading(true);
		}
	}, [getFilteredRowsIsLoading]);

	const filteredRows = useAppSelector((state) => state.table.filteredRows);
	useEffect(() => {
		if (getFilteredRowsError) {
			dispatch(setFilteredRows([]));
		}
	}, [getFilteredRowsError, setFilteredRows, dispatch]);

	const fetchByFiltersForce = useCallback(async () => {
		console.log('fetchQueryRef', fetchQueryRef.current);

		await queryClient.invalidateQueries({
			queryKey: [fetchQueryRef.current],
			exact: true,
			refetchType: 'all',
			type: 'all',
		});
		let data = await queryClient.getQueryData([fetchQueryRef.current]);
		console.log('data', data);
		data = await queryClient.fetchQuery({queryKey: [fetchQueryRef.current], queryFn: fetcher});
		console.log('data', data);
		await refetch();
	}, [queryClient, fetchQueryRef, refetch]);

	// useEffect(() => {
	// 	fetchByFilters();
	// }, []);

	useEffect(() => {
		const newQuery = createQueryParamsFromFilter(filters);
		setFetchQuery(newQuery);
	}, [executor, status, type]);

	useEffect(() => {
		if (getFilteredRowsIsSuccess) {
			dispatch(setFilteredRows(dataRef.current));
		}
	}, [getFilteredRowsIsSuccess, setFilteredRows, dispatch]);

	useEffect(() => {
		setIsRowsLoading(false);
	}, [data]);

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

		getFilteredRowsError,
		getFilteredRowsIsLoading: getFilteredRowsIsLoading || isRowsLoading,
		fetchByFiltersForce,
		fetchByFilters: () => refetch().catch(() => {}),
		filteredRows,
		isAutoUpdate,
		setIsAutoUpdate,
	};
};
