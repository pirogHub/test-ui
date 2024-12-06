export const loadState = (): any => {
	try {
		const serializedState = localStorage.getItem('reduxState');
		if (serializedState === null) {
			return undefined; // Если ничего не найдено, возвращаем undefined для использования initialState
		}
		return JSON.parse(serializedState);
	} catch (error) {
		console.error('Не удалось загрузить состояние:', error);
		return undefined;
	}
};

export const saveState = (state: any): void => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('reduxState', serializedState);
	} catch (error) {
		console.error('Не удалось сохранить состояние:', error);
	}
};
