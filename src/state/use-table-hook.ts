import {use, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {api} from '@/api/base';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {bindActionCreators} from 'redux';

import {setType} from './proposal.slice';
import {useAppDispatch, useAppSelector} from './store';
import {tableActions} from './table.slice';
import {logout, setUser} from './user.slice';

export const useTableStore = () => {
	const dispatch = useAppDispatch();
	// const handlers = bindActionCreators({...tableActions}, dispatch);

	const handlers = useMemo(
		() => bindActionCreators({...tableActions}, dispatch),

		[dispatch],
	);

	const {setFilteredRows} = handlers;
	// const {
	// 	isPending: loginIsPending,
	// 	mutate,
	// 	error: loginError,
	// } = useMutation({
	// 	mutationKey: ['login'],
	// 	mutationFn: api.login,

	// 	onSuccess: (userData) => {
	// 		dispatch(setUser(userData.user));
	// 	},
	// 	onError: (error) => {
	// 		dispatch(logout());
	// 	},
	// });
	const queryClient = useQueryClient();

	const {
		isLoading: getFilteredRowsIsLoading,
		refetch,

		data,
		error: getFilteredRowsError,
		isSuccess: getFilteredRowsIsSuccess,
	} = useQuery<unknown[]>({
		// initialData: [],
		queryKey: ['table-filtered-rows'],
		queryFn: api.fetchFilteredRows,
		retryOnMount: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		retry: 0,
		enabled: false,
	});
	const [isRowsLoading, setIsRowsLoading] = useState(true);

	const dataRef = useRef(data);
	dataRef.current = data;

	useEffect(() => {
		// console.log('getFilteredRowsIsLoading', getFilteredRowsIsLoading);

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

	// useEffect(() => {
	// 	if (user === null && !loginIsPending && !getFilteredRowsIsLoading) {
	// 		const getToken = localStorage.getItem('authToken');
	// 		if (getToken) {
	// 			if (getFilteredRowsError || loginError) {
	// 				dispatch(logout());
	// 			} else {
	// 				refetch().catch(() => {});
	// 			}
	// 		}
	// 	}
	// }, [user, dispatch, refetch, loginError, loginIsPending, getFilteredRowsError, getFilteredRowsIsLoading]);

	const tableData = useAppSelector((state) => state.table);

	// useEffect(() => {
	// 	console.log('tableData', tableData);
	// }, [tableData]);
	useEffect(() => {
		if (getFilteredRowsIsSuccess) {
			console.log('getFilteredRowsIsSuccess', getFilteredRowsIsSuccess);
			dispatch(setFilteredRows(dataRef.current));
		}
	}, [getFilteredRowsIsSuccess, setFilteredRows, dispatch]);

	useEffect(() => {
		console.log('data', data);
		// console.log('------------');

		setIsRowsLoading(false);
	}, [data]);

	// console.log('----', getFilteredRowsIsLoading, isRowsLoading);

	return {
		// ...handlers,
		// selectedExecutors: tableData.executors,
		// selectedStatuses: tableData.status,
		// selectedAppTypes: tableData.type,
		// setSelectedExecutors: handlers.setExecutors,
		// setSelectedStatuses: handlers.setStatus,
		// setSelectedAppTypes: handlers.setType,
		// handlers: {
		// 	executor: {
		// 		data: tableData.executors,
		// 		setter: handlers.setExecutors,
		// 	},
		// 	status: {
		// 		data: tableData.status,
		// 		setter: handlers.setStatus,
		// 	},
		// 	type: {
		// 		data: tableData.type,
		// 		setter: handlers.setType,
		// 	},
		// },
		data: {
			executor: tableData.executors,
			status: tableData.status,
			type: tableData.type,
		},
		setters: useMemo(
			() => ({
				executor: handlers.setExecutors,
				status: handlers.setStatus,
				type: handlers.setType,
			}),
			[handlers],
		),
		// user,
		// login: mutate,
		// logout: useCallback(() => {
		// 	dispatch(logout());
		// }, [dispatch]),
		// loginIsPending,
		// loginError,
		getFilteredRowsError,
		getFilteredRowsIsLoading: getFilteredRowsIsLoading || isRowsLoading,
		fetchByFilters: () => {
			// queryClient.removeQueries({queryKey: ['table-filtered-rows']});
			// queryClient.fetchQuery({queryKey: ['table-filtered-rows']}).catch(() => {});
			// queryClient.refetchQueries({queryKey: ['table-filtered-rows']}).catch(() => {});
			console.log('refetch');
			// queryClient.resetQueries({queryKey: ['table-filtered-rows']}).catch(() => {});
			// queryClient.invalidateQueries({queryKey: ['table-filtered-rows']}).catch(() => {});

			queryClient.invalidateQueries({queryKey: ['table-filtered-rows']}).catch(() => {});
			refetch().catch(() => {});
		},
		filteredRows,
	};
};
