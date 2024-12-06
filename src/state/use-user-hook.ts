import {useCallback, useEffect} from 'react';

import {api} from '@/api/base';
import {useMutation, useQuery} from '@tanstack/react-query';

import {useAppDispatch, useAppSelector} from './store';
import {logout, setUser} from './user.slice';

export const useUserStore = () => {
	const dispatch = useAppDispatch();

	const {
		isPending: loginIsPending,
		mutate,
		error: loginError,
	} = useMutation({
		mutationKey: ['login'],
		mutationFn: api.login,

		onSuccess: (userData) => {
			dispatch(setUser(userData.user));
		},
		onError: () => {
			dispatch(logout());
		},
	});
	const {
		isLoading: getUserIsLoading,
		refetch,
		data,
		error: getUserError,
		isSuccess: getUserIsSuccess,
	} = useQuery({
		queryKey: ['user'],
		queryFn: api.getUser,
		retryOnMount: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});

	const user = useAppSelector((state) => state.user.userData);
	useEffect(() => {
		if (getUserError) {
			dispatch(logout());
			// toast({
			// 	title: 'Error getting todos',
			// 	description: error.message,
			// 	status: 'error',
			// });
		}
	}, [getUserError, dispatch]);

	useEffect(() => {
		if (getUserIsSuccess && data) {
			dispatch(setUser(data));
		}
	}, [data, getUserIsSuccess, dispatch]);

	useEffect(() => {
		if (user === null && !loginIsPending && !getUserIsLoading) {
			const getToken = localStorage.getItem('authToken');
			if (getToken) {
				if (getUserError || loginError) {
					dispatch(logout());
				} else {
					refetch().catch(() => {});
				}
			}
		}
	}, [user, dispatch, refetch, loginError, loginIsPending, getUserError, getUserIsLoading]);
	return {
		user,
		login: mutate,
		logout: useCallback(() => {
			dispatch(logout());
		}, [dispatch]),
		loginIsPending,
		loginError,
		getUserError,
		getUserIsLoading,
		refetch,
	};
};
