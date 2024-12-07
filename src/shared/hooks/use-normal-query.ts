import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {useDebounce} from './use-debounce';

type NormalQueryProps<FetchArgs, FetchedDataType> = {
	queryKey: FetchArgs; // TODO если ставить как в ревльном queryKey [key1, key2], то вызывается бесконечный перерендер
	// queryKey: string;
	queryFn: (fetchArgs: FetchArgs) => FetchedDataType;
	onSuccess?: (data: Awaited<FetchedDataType>) => void;
	onError?: (error: {message: string}) => void;
	fetchOnMount?: boolean;
	disableAutoFetchByChangedQueryKey?: boolean;
	timeoutBeforeMountFetch?: number;
	// transformData?: (data: FetchedDataType) => any;
};

export const useNormalQuery = <FetchArgs, FetchedDataType>({
	queryKey,
	queryFn,
	onSuccess,
	onError,
	fetchOnMount,
	disableAutoFetchByChangedQueryKey,
	timeoutBeforeMountFetch,
	// transformData,
}: NormalQueryProps<FetchArgs, FetchedDataType>) => {
	const [fakeMemoizedQuery, setFakeMemoizedQuery] = useState(queryKey);

	const prevQueryKey = useRef(queryKey);

	useEffect(() => {
		console.log('compare'); // TODO что использует реальный useQuery?

		const jsonPrev = JSON.stringify(prevQueryKey.current);
		const newQueryKey = JSON.stringify(queryKey);
		if (jsonPrev !== newQueryKey) {
			prevQueryKey.current = queryKey;
			setFakeMemoizedQuery(queryKey);
		}
	}, [queryKey]);

	const {debouncedValue: queryKeyDebounced, isDebounceLoading} = useDebounce(fakeMemoizedQuery, 1000); // TODO добавить проверку ключей, так как если передавать массив, то массив же пересобирается и бесконечный фетч идет

	const queryKeyRef = useRef(queryKeyDebounced);
	queryKeyRef.current = queryKeyDebounced;

	const [isLoading, setIsLoading] = useState(fetchOnMount ? true : false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<FetchedDataType | null>(null);

	const onSuccessRef = useRef(onSuccess);
	onSuccessRef.current = onSuccess;

	const onErrorRef = useRef(onError);
	onErrorRef.current = onError;

	const fetchByQuery = useCallback(
		async (props?: {noConflictWithAutoFetch?: true}) => {
			if (props?.noConflictWithAutoFetch && !disableAutoFetchByChangedQueryKey) {
				console.log('safe duplicate');

				return;
			}
			console.log('fetchByQuery', queryKeyRef.current);

			try {
				setIsLoading(true);
				setIsSuccess(false);
				console.log('queryKeyRef.current', queryKeyRef.current);

				const res = await queryFn(queryKeyRef.current);
				// const transformedData = transformData ? transformData(res) : res; // TODO добавить transform с выкидыванием ошибки если data не ок
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

	const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (fetchOnMount) {
			if (timeoutIdRef.current) {
				console.log('useNormalQuery: two mounts at the same time?');
			}
			timeoutIdRef.current = setTimeout(() => {
				fetchByQuery().catch(() => {});
			}, timeoutBeforeMountFetch || 0);
		}
		return () => {
			if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
			timeoutIdRef.current = null;
		};
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

	const [queueFetchFlag, setQueueFetchFlag] = useState(false);
	const readyToFetchRef = useRef(false);

	const putFetchInQuery = useCallback(() => {
		setQueueFetchFlag((prev) => true);
		readyToFetchRef.current = true;
	}, []);

	useEffect(() => {
		// if (!queueFetchFlag) return;
		if (!readyToFetchRef.current) return;
		readyToFetchRef.current = false;
		queryKeyRef.current = queryKey;
		console.log('fetch');

		fetchByQuery({noConflictWithAutoFetch: true}).catch(() => {});
		// setQueueFetchFlag(false);
	}, [queryKey, fetchByQuery]);

	return {
		isLoading,
		error,
		fetchByQuery: putFetchInQuery,
		fetchManualParams: queryFn,
		isSuccess,
		data,
	};
};
