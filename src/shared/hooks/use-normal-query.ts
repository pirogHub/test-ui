import {useCallback, useEffect, useRef, useState} from 'react';

import {useDebounce} from './use-debounce';

type NormalQueryProps<FetchArgs, FetchedDataType> = {
	queryKey: FetchArgs;
	queryFn: (fetchArgs: FetchArgs) => FetchedDataType;
	onSuccess?: (data: Awaited<FetchedDataType>) => void;
	onError?: (error: {message: string}) => void;
	fetchOnMount?: boolean;
	disableAutoFetchByChangedQueryKey?: boolean;
	// transformData?: (data: FetchedDataType) => any;
};

export const useNormalQuery = <FetchArgs, FetchedDataType>({
	queryKey,
	queryFn,
	onSuccess,
	onError,
	fetchOnMount,
	disableAutoFetchByChangedQueryKey,
	// transformData,
}: NormalQueryProps<FetchArgs, FetchedDataType>) => {
	const {debouncedValue: queryKeyDebounced, isDebounceLoading} = useDebounce(queryKey, 1000);
	const queryKeyRef = useRef(queryKeyDebounced);
	queryKeyRef.current = queryKeyDebounced;

	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<FetchedDataType | null>(null);

	const onSuccessRef = useRef(onSuccess);
	onSuccessRef.current = onSuccess;

	const onErrorRef = useRef(onError);
	onErrorRef.current = onError;

	const fetchByQuery = useCallback(
		async (notDuplicate?: true) => {
			if (notDuplicate && !disableAutoFetchByChangedQueryKey) {
				console.log('safe duplicate');

				return;
			}
			console.log('fetchByQuery');

			try {
				setIsLoading(true);
				setIsSuccess(false);
				console.log('queryKeyRef.current', queryKeyRef.current);

				const res = await queryFn(queryKeyRef.current);
				// const transformedData = transformData ? transformData(res) : res;
				setData(res);
				onSuccessRef.current?.(res);
				setIsSuccess(true);
			} catch (error) {
				setIsSuccess(false);
				const e = error as {message: string};
				setError(e?.message || 'Something went wrong');
				onErrorRef.current?.(e);
			} finally {
				setIsLoading(false);
			}
		},
		[queryKeyRef, queryFn, disableAutoFetchByChangedQueryKey, onSuccessRef, onErrorRef],
	);

	useEffect(() => {
		if (fetchOnMount) {
			fetchByQuery().catch(() => {});
		}
	}, [fetchByQuery, fetchOnMount]);

	useEffect(() => {
		if (!disableAutoFetchByChangedQueryKey) {
			console.log('autofetch');

			queryKeyRef.current = queryKeyDebounced;
			fetchByQuery().catch(() => {});
		}
	}, [queryKeyDebounced, queryKeyRef, fetchByQuery, disableAutoFetchByChangedQueryKey]);

	useEffect(() => {
		if (!disableAutoFetchByChangedQueryKey && isDebounceLoading) {
			setIsLoading(true);
		}
	}, [isDebounceLoading, disableAutoFetchByChangedQueryKey]);

	return {
		isLoading,
		error,
		fetchByQuery,
		fetchManualParams: queryFn,
		isSuccess,
		data,
	};
};
