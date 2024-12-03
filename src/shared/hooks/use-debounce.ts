import {useEffect, useState} from 'react';

/**
 * useDebounce
 * @param value - значение, которое нужно дебаунсить
 * @param delay - задержка в миллисекундах
 * @returns дебаунсное значение
 */
export const useDebounce = <T>(value: T, delay: number): {debouncedValue: T} => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay || 0);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return {debouncedValue};
};
