import React, {useCallback, useEffect, useMemo} from 'react';

import {MyBaseApi} from '@/api/base';
import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {NewFilter, NewFilterSortFunctionType} from '@/pages/dashboard/page-filters/filter/filter';
import {
	FiltersNamesType,
	ProposalExecutorIdType,
	ProposalExecutorType,
	ProposalFilterRecordType,
	ProposalSetFilterActionType,
	ProposalStatusIdList,
	ProposalTypeIdList,
} from '@/state/types';

import {useNormalQuery} from '@/shared/hooks/use-normal-query';
import {MyIconName, getIconUrlByName} from '@/shared/icons/icons-data';
import {useCustomStore} from '@/shared/providers/store-provider';
import {Icon2} from '@/shared/ui/icon';
import {StatusBadge} from '@/shared/ui/status-badge';

const translateAppTypes = {
	inner: 'Внутренняя',
	outer: 'Заказная',
};

const dataStatus = [...ProposalStatusIdList].map((i) => ({id: i, name: i}));
const dataType = [...ProposalTypeIdList].map((i) => ({id: i, name: i}));

const dataExecutors: ProposalExecutorType[] = [
	{id: 'Иван Иванов', name: 'Иван Иванов', email: '123'},
	{id: 'Пётр Петров', name: 'Пётр Петров', email: '123'},
	{id: 'Сергей Сергеев', name: 'Сергей Сергеев', email: '123'},
	{id: 'Николай Николаев', name: 'Николай Николаев', email: '123'},
];

const datasMap = {
	status: {
		data: dataStatus,
		iconName: 'quill',
		renderItem: (item: (typeof dataStatus)[0]) => <StatusBadge status={item.id} />,
	},
	type: {
		data: dataType,
		iconName: 'sliders',
		renderItem: (item: (typeof dataType)[0]) => <span>{translateAppTypes[item.name]}</span>,
	},
	executor: {
		data: dataExecutors,
		iconName: 'user02',
		renderItem: (item: (typeof dataExecutors)[0]) => <span key={item.id}>{item.name}</span>,
	},
} as const;

const dataFilters: {id: FiltersNamesType; name: string}[] = [
	{id: 'status', name: 'Status'},
	{id: 'type', name: 'Type'},
	{id: 'executor', name: 'Executor'},
];

const dictionaryFilterData: Record<FiltersNamesType, {label: string; iconName: MyIconName}> = {
	status: {
		label: 'Статус',
		iconName: 'quill',
	},
	type: {
		label: 'Тип',
		iconName: 'sliders',
	},
	executor: {
		label: 'Исполнитель',
		iconName: 'user02',
	},
};

const executorSearchTermFilterFunc: NewFilterSortFunctionType<ProposalExecutorIdType, ProposalExecutorType> = (
	item,
	searchTerm,
) => {
	return item.name.toLowerCase().includes(searchTerm.toLowerCase());
};
const dataFiltersMap = {
	executor: {
		withThisSearchFunction: executorSearchTermFilterFunc,
	},
} as const;

export const FiltersCreator = () => {
	const {tableStore} = useCustomStore();

	const [executorsList, setExecutorsList] = React.useState<{id: number; key: string; name: string}[]>([]);
	const [executorPendingError, setExecutorPendingError] = React.useState<string | undefined>();
	const {
		isLoading: isExecutorPending,
		isSuccess,
		error,
	} = useNormalQuery({
		queryKey: ['executors'],
		queryFn: MyBaseApi.fetchExecutors,
		disableAutoFetchByChangedQueryKey: true,
		fetchOnMount: true,
		timeoutBeforeMountFetch: 100,
		onSuccess: (data) => {
			console.log('data', data);
			if (data.type === 'success') {
				setExecutorsList(data.data);
			} else {
				setExecutorPendingError('error on fetching'); // TODO add transform todo inside useNormalQuery
			}
		},
		onError: (error) => {
			setExecutorPendingError('error on fetching 2');
			// toast
		},
	});

	const {setShowedFiltersOrder, showedFiltersOrder, data: filtersData, setters, fetchRowsByQuery} = tableStore;

	useEffect(() => {
		console.log('showedFiltersOrder', showedFiltersOrder);
	}, [showedFiltersOrder]);

	const [firstOpenSelectedFilter, setFirstOpenSelectedFilter] = React.useState<FiltersNamesType | null>(null);

	const onSelectFilterToShow = useCallback(
		(val: ProposalSetFilterActionType<FiltersNamesType>) => {
			const [items] = val;
			const [item] = items;
			setShowedFiltersOrder({data: item.id});
			setFirstOpenSelectedFilter(item.id);
		},
		[setShowedFiltersOrder],
	);

	const onFilterRemove = (filterId: FiltersNamesType) => {
		setShowedFiltersOrder({data: filterId});
	};

	const clearAllFilters = () => {
		setShowedFiltersOrder({data: null, clearAll: true});
		setters.executor([[], false]); // TODO а что если передать [], true ? м б использовать объявление типов как в startListening c его never. startListening в createListenerMiddleware from redux-toolkit
		setters.status([[], false]);
		setters.type([[], false]);

		// console.log('fetch my rows: remove all filters');
		fetchRowsByQuery({testData: 'by remove all filters'});
	};

	return (
		<div style={{display: 'flex', flexDirection: 'row', gap: '8px'}}>
			{showedFiltersOrder.map((it) => {
				console.log('!!!!!!!!!!!!!');

				const itData = datasMap[it];
				if (!itData) return null;
				let isLoading = false;

				let realData = datasMap[it].data;
				let errorLoadingDataMessage = undefined;
				if (it === 'executor') {
					isLoading = isExecutorPending;
					// isError = !!executorPendingError;
					// @ts-expect-error создать общий тип
					realData = executorsList;
					errorLoadingDataMessage = executorPendingError;
				}
				return (
					<NewFilter
						openWhenCreate={firstOpenSelectedFilter === it}
						withCheckAll={it === 'executor'}
						filterId={it}
						key={it}
						filterIconComponent={<Icon2 color="icon2" size={20} url={getIconUrlByName(itData.iconName)} />}
						filterName={dictionaryFilterData[it].label || it}
						onFilterRemove={() => {
							onFilterRemove(it);

							// console.log('fetch my rows: remove filter');
							fetchRowsByQuery({testData: `by remove filter: ${it}`});
						}}
						// @ts-expect-error TODO подумать как правильно описать типы, т к если вместо map писать каждый фильтр вручную, то ошибок типов не будет
						// allList={itData.data}
						allList={realData}
						isDataLoading={isLoading}
						errorLoadingDataMessage={errorLoadingDataMessage}
						// @ts-expect-error TODO подумать как правильно описать типы, т к если вместо map писать каждый фильтр вручную, то ошибок типов не будет
						alreadySelected={filtersData[it]}
						onSelect={(id) => {
							setFirstOpenSelectedFilter(null);
							// @ts-expect-error TODO подумать как правильно описать типы, т к если вместо map писать каждый фильтр вручную, то ошибок типов не будет
							setters[it](id);
						}}
						// @ts-expect-error TODO подумать как правильно описать типы, т к если вместо map писать каждый фильтр вручную, то ошибок типов не будет
						// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
						withThisSearchFunction={dataFiltersMap?.[it]?.withThisSearchFunction}
						// @ts-expect-error TODO подумать как правильно описать типы, т к если вместо map писать каждый фильтр вручную, то ошибок типов не будет
						renderItem={itData.renderItem}
						onSubmitFilter={() => {
							// console.log('fetch my rows: submit');
							fetchRowsByQuery({testData: `by submit filter: ${it}`});
						}}
						onPopupClose={() => {
							// console.log('fetch my rows: popup close');
							fetchRowsByQuery({testData: `by popup close filter: ${it}`});
						}}
						onFilterValuesDrop={() => {}}
					/>
				);
			})}

			<NewFilter
				closeWhenSelect
				minListWidth="150px"
				noCheckbox
				withoutShowCount
				withoutChest
				filterIconComponent={<Icon2 color="icon2" size={20} url={getIconUrlByName('filterAdd')} />}
				filterId="add-filter"
				hideIfEmpty
				noFooterActions
				hideIfChecked
				// filterName="Add Filter"
				allList={dataFilters}
				alreadySelected={useMemo(() => {
					return showedFiltersOrder.reduce((acc, i) => {
						acc[i] = Boolean(i);
						return acc;
					}, {} as ProposalFilterRecordType<FiltersNamesType>);
				}, [showedFiltersOrder])}
				renderItem={useCallback(
					(item: {id: 'type' | 'status' | 'executor'; name: string}) => (
						<div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
							<Icon2
								sx={{opacity: 1}}
								color="icon2"
								size={20}
								url={getIconUrlByName(dictionaryFilterData[item.id].iconName)}
							/>
							{dictionaryFilterData[item.id].label}
						</div>
					),
					[],
				)}
				onSelect={onSelectFilterToShow}
			/>
			{showedFiltersOrder.length > 0 && (
				<ButtonStyled size="m" view="flatted" onClick={clearAllFilters} label="Очистить фильтры" />
			)}
		</div>
	);
};
