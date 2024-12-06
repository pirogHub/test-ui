import {useEffect, useState} from 'react';

/**
 * useDebounce
 * @param value - значение, которое нужно дебаунсить
 * @param delay - задержка в миллисекундах
 * @returns дебаунсное значение
 */
export const useDebounce = <T>(value: T, delay: number): {debouncedValue: T; isDebounceLoading: boolean} => {
	const [debouncedValue, setDebouncedValue] = useState(value);
	const [isDebounceLoading, setIsDebounceLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsDebounceLoading(true);
		const handler = setTimeout(() => {
			setDebouncedValue(value);
			setIsDebounceLoading(false);
		}, delay || 0);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return {debouncedValue, isDebounceLoading};
};
