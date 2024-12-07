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
import {StatusBadge} from '@/shared/ui/status-badge';

import {NewFilter, NewFilterSortFunctionType} from './filter/filter';

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
		renderItem: (item: (typeof dataExecutors)[0]) => <span>{item.name}</span>,
	},
} as const;

const dataFilters: {id: FiltersNamesType; name: string}[] = [
	{id: 'status', name: 'Status'},
	{id: 'type', name: 'Type'},
	{id: 'executor', name: 'Executor'},
];

const dictionaryFilterData = {
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

const Page = () => {
	const {tableStore} = useCustomStore();

	const {setShowedFiltersOrder, showedFiltersOrder, data: filtersData, setters} = tableStore;

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
		setters.executor([[], false]);
		setters.status([[], false]);
		setters.type([[], false]);
		console.log('fetch my rows: remove all filters');
	};

	return (
		<div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
			{showedFiltersOrder.map((it) => {
				const itData = datasMap[it];
				if (!itData) return null;
				return (
					<NewFilter
						openWhenCreate={firstOpenSelectedFilter === it}
						withCheckAll={it === 'executor'}
						filterId={it}
						key={it}
						filterIconComponent={<Icon2 color="icon2" size={20} url={getIconUrlByName(itData.iconName)} />}
						filterName={dataFilters.find((f) => f.id === it)?.name ?? ''}
						onFilterRemove={() => {
							onFilterRemove(it);

							console.log('fetch my rows: remove filter');
						}}
						// @ts-expect-error TODO подумать как правильно описать типы, т к если вместо map писать каждый фильтр вручную, то ошибок типов не будет
						allList={itData.data}
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
						renderItem={itData.renderItem}
						onSubmitFilter={() => {
							console.log('fetch my rows: submit');
						}}
						onPopupClose={() => {
							console.log('fetch my rows: popup close');
						}}
						onFilterValuesDrop={() => {}}
					/>
				);
			})}

			<div style={{width: '20px'}}></div>
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
				renderItem={(item) => (
					<div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
						<Icon2
							sx={{opacity: 1}}
							color="icon2"
							size={20}
							url={getIconUrlByName(dictionaryFilterData[item.id].iconName)}
						/>
						{dictionaryFilterData[item.id].label}
					</div>
				)}
				onSelect={onSelectFilterToShow}
			/>
			{showedFiltersOrder.length > 0 && (
				<ButtonStyled size="m" view="flatted" onClick={clearAllFilters} label="Очистить фильтры" />
			)}
		</div>
	);
};

export default Page;
