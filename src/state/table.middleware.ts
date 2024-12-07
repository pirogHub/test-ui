import {Middleware, createListenerMiddleware, isAnyOf} from '@reduxjs/toolkit';

import {RootState} from './store';
import {tableActions} from './table.slice';

export const queryObjectMiddleware = createListenerMiddleware();

const isSetFilterOrSortingAction = isAnyOf(
	tableActions.setExecutors,
	tableActions.setSorting,
	tableActions.setStatus,
	tableActions.setType,
);
queryObjectMiddleware.startListening({
	// actionCreator: ,
	// actionCreators: setFilterTypes,
	// type: tableActions.setExecutors.type,
	// matcher: (v) => v.type is boolean
	matcher: isSetFilterOrSortingAction,
	// matcher: (action) => {
	// 	if (action && (action as {type: string}).type) {
	// 		return setFilterTypes.includes((action as {type: string}).type);
	// 	}

	// 	return false;
	// },
	effect: (action, listenerApi) => {
		// Run whatever additional side-effect-y logic you want here
		console.log('action.payload ', action.payload);

		// Can cancel other running instances
		// listenerApi.cancelActiveListeners();

		// Run async logic
		// const data = await fetchData();
		listenerApi.dispatch(tableActions.setQueryObject());
		// Pause until action dispatched or state changed
		// if (await listenerApi.condition(matchSomeAction)) {
		// 	// Use the listener API methods to dispatch, get state,
		// 	// unsubscribe the listener, start child tasks, and more
		// 	listenerApi.dispatch(tableActions.setQueryObject());

		// 	// Spawn "child tasks" that can do more work and return results
		// 	const task = listenerApi.fork(async (forkApi) => {
		// 		// Can pause execution
		// 		await forkApi.delay(5);
		// 		// Complete the child by returning a value
		// 		return 42;
		// 	});

		// const result = await task.result;
		// 	// Unwrap the child result in the listener
		// 	if (result.status === 'ok') {
		// 		// Logs the `42` result value that was returned
		// 		console.log('Child succeeded: ', result.value);
		// 	}
		// }
	},
});

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const queryObjectMiddleware1: Middleware<{}, RootState> = (store) => (next) => (action) => {
	const result = next(action);

	// Список действий, которые требуют обновления queryObject
	const actionsToWatch = ['table/setStatus', 'table/setType', 'table/setExecutors', 'table/setSorting'];
	const actionType: string | null = action ? (action as {type: string})?.type : null;
	if (actionType && actionsToWatch.includes(actionType)) {
		// const state = store.getState().table;

		// const notEmptyFilters = Object.entries(state.filters).reduce(
		// 	(acc, [key, val]) => {
		// 		const arr = Object.entries(val)
		// 			.filter(([, isSelected]) => isSelected)
		// 			.map(([key]) => key);
		// 		if (arr.length > 0) acc[key] = arr;
		// 		return acc;
		// 	},
		// 	{} as Record<string, string[]>,
		// );

		// const definedSorting = !state.sorting
		// 	? null
		// 	: state.sorting.reduce(
		// 			(acc, [colName, direction]) => {
		// 				if (direction) {
		// 					acc.push([colName, direction]);
		// 				}
		// 				return acc;
		// 			},
		// 			[] as [ProposalSortingItem[0], Exclude<ProposalSortingItem[1], undefined>][],
		// 		);
		store.dispatch(
			tableActions
				.setQueryObject
				// 	{
				// 	filters: notEmptyFilters,
				// 	...(definedSorting ? {sorting: definedSorting} : {}),
				// }
				(),
		);
		// store.dispatch({
		// 	type: 'table/updateQueryObject',
		// 	payload: {
		// 		filters: notEmptyFilters,
		// 		...(definedSorting ? {sorting: definedSorting} : {}),
		// 	},
		// });
	}

	return result;
};
