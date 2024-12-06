import React, {useCallback, useEffect, useMemo} from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {
	FiltersNamesType,
	ProposalExecutorIdType,
	ProposalExecutorType,
	ProposalFilterRecordType,
	ProposalSetFilterActionType,
	ProposalStatusIdList,
	ProposalTypeIdList,
} from '@/state/types';

import {getIconUrlByName} from '@/shared/icons/icons-data';
import {useCustomStore} from '@/shared/providers/store-provider';
import {Icon2} from '@/shared/ui/icon';

import {NewFilter, NewFilterSortFunctionType} from './filter/filter';

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
	},
	type: {data: dataType, iconName: 'sliders'},
	executor: {data: dataExecutors, iconName: 'user02'},
} as const;

const dataFilters: {id: FiltersNamesType; name: string}[] = [
	{id: 'status', name: 'Status'},
	{id: 'type', name: 'Type'},
	{id: 'executor', name: 'Executor'},
];

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

const Page = () => {
	const {tableStore} = useCustomStore();

	const {setShowedFiltersOrder, showedFiltersOrder, data: filtersData, setters} = tableStore;

	const onSelectFilterToShow = useCallback(
		(data: ProposalSetFilterActionType<FiltersNamesType>) => {
			const [items] = data;
			const [item] = items;
			setShowedFiltersOrder({data: item.id});
		},
		[setShowedFiltersOrder],
	);

	const {executor} = filtersData;
	useEffect(() => {
		console.log('showedFiltersOrder', showedFiltersOrder);
	}, [showedFiltersOrder]);

	const onFilterRemove = (filterId: FiltersNamesType) => {
		setShowedFiltersOrder({data: filterId});
	};

	const clearAllFilters = () => {
		setShowedFiltersOrder({data: [], clearAll: true});
		setters.executor([[], false]);
		setters.status([[], false]);
		setters.type([[], false]);
	};

	console.log('datasMap', datasMap);

	return (
		<div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
			{showedFiltersOrder.map((it) => {
				const itData = datasMap[it];
				if (!itData) return null;
				return (
					<NewFilter
						filterId={it}
						key={it}
						filterIconComponent={<Icon2 color="icon2" size={20} url={getIconUrlByName(itData.iconName)} />}
						filterName={dataFilters.find((f) => f.id === it)?.name ?? ''}
						onFilterRemove={() => onFilterRemove(it)}
						// @ts-expect-error TODO подумать как правильно описать типы, т к если вместо map писать каждый фильтр вручную, то ошибок типов не будет
						allList={itData.data}
						// @ts-expect-error TODO подумать как правильно описать типы, т к если вместо map писать каждый фильтр вручную, то ошибок типов не будет
						alreadySelected={filtersData[it]}
						// @ts-expect-error TODO подумать как правильно описать типы, т к если вместо map писать каждый фильтр вручную, то ошибок типов не будет
						onSelect={setters[it]}
						// @ts-expect-error TODO подумать как правильно описать типы, т к если вместо map писать каждый фильтр вручную, то ошибок типов не будет
						// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
						withThisSearchFunction={dataFiltersMap?.[it]?.withThisSearchFunction}
					/>
				);
			})}

			<div style={{width: '20px'}}></div>
			<NewFilter
				label=""
				filterIconComponent={<Icon2 color="icon2" size={20} url={getIconUrlByName('filterAdd')} />}
				filterId="add-filter"
				hideIfEmpty
				noFooterActions
				hideIfChecked
				filterName="Add Filter"
				allList={dataFilters}
				alreadySelected={useMemo(() => {
					return showedFiltersOrder.reduce((acc, i) => {
						acc[i] = Boolean(i);
						return acc;
					}, {} as ProposalFilterRecordType<FiltersNamesType>);
				}, [showedFiltersOrder])}
				onSelect={onSelectFilterToShow}
			/>
			{showedFiltersOrder.length > 0 && (
				<ButtonStyled size="m" view="flatted" onClick={clearAllFilters} label="Очистить фильтры" />
			)}
		</div>
	);
};

export default Page;
