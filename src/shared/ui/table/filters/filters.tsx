import React, {useCallback, useEffect, useMemo, useRef} from 'react';

import {api} from '@/api/base';
import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {useTableStore} from '@/state/use-table-hook';

import {getIconUrlByName} from '@/shared/icons/icons-data';
import {useCustomStore} from '@/shared/providers/store-provider';

import {Icon2} from '../../icon';
import {CreateProposal} from '../create-proposal';
import {FilterItem} from './filter-item';
import {CustomFader} from './filter-item/filter-button';
import {FiltersDataToShow} from './filters-data';

// initialState: tableData[name].reduce((acc, item) => {
// 	return {
// 		...acc,
// 		[item]: true,
// 	};
// }, {}),
// key: name,
// label: item.label,
// clearAllFlag: true,
// filterIconComponentName: item.filterIconComponentName,
// onSetData: setters[name],
// // dataToShow: item.data,
// renderItem: item.renderItem,
// filterFunction: item?.filterFunction,
// onClose: removeFilter,

type FilterItemBaseType = {key: string} & Pick<
	React.ComponentProps<typeof FilterItem>, //
	| 'initialState'
	| 'filterKey'
	| 'label'
	| 'clearFilterFlag'
	| 'filterIconComponent'
	| 'filterFunction'
	| 'onSetData'
	// | 'dataToShow'
	| 'renderItem'
	| 'onClose'
	| 'isDataLoading'
	| 'withoutCheckAll'
>;

const FiltersListFullConstant = Object.values(FiltersDataToShow);

type FiltersType = keyof typeof FiltersDataToShow;

const allFiltersNamesList = Object.keys(FiltersDataToShow) as FiltersType[];

const FiltersVariants = () => {
	const {tableStore} = useCustomStore();
	const {fetchByFiltersForce, data: tableData, setters, showedFiltersOrder} = tableStore;

	const {status: selectedStatuses, type: selectedAppTypes, executor: selectedExecutors} = tableData;

	const isShowClearAll =
		selectedStatuses?.length > 0 || selectedAppTypes?.length > 0 || selectedExecutors?.length > 0;

	const [clearAllFlag, setClearAllFlag] = React.useState(false);

	// const [filtersListShowed, setFiltersListShowed] = React.useState<Partial<Record<T['key'], boolean>>>(
	// 	showedFiltersOrder.reduce((acc, item) => {
	// 		return {
	// 			...acc,
	// 			[item]: true,
	// 		};
	// 	}, {}),
	// );
	const [filtersListShowed, setFiltersListShowed] = React.useState<Partial<Record<string, boolean>>>(
		// const [filtersListShowed, setFiltersListShowed] = React.useState<Partial<Record<T['key'], boolean>>>(
		Object.keys(tableData)?.reduce((acc, item) => {
			return {
				...acc,
				// @ts-expect-error toremove
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				[item]: Boolean(tableData?.[item]?.length),
			};
		}, {}),
	);

	const [filtersListShowed2, setFiltersListShowed2] = React.useState<FiltersType[]>(
		// @ts-expect-error toremove
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		Object.keys(tableData)?.filter((item) => Boolean(tableData?.[item]?.length)) as FiltersType[],
	);

	const filtersListNotShowed = useMemo(() => {
		const result = FiltersListFullConstant.filter((item) => {
			// @ts-expect-error toremove
			const isAlreadyShowed = filtersListShowed2.includes(item.key);
			return !isAlreadyShowed; // TODO поменять на чек как поле в объекте
		});
		return result;
	}, [filtersListShowed2]);

	const removeFilter = useCallback(
		(filterKey: string) => {
			console.log('removeFilter', filterKey);

			setFiltersListShowed((prev) => {
				return {
					...prev,
					[filterKey]: false,
				};
			});
			// fetchByFiltersForce();
			fetchByFiltersForce();
		},
		[setFiltersListShowed, fetchByFiltersForce],
	);

	const [executorsList, setExecutorsList] = React.useState<string[]>([]);
	const [isExecutorPending, setIsExecutorPending] = React.useState<boolean>(true);
	const [isExecutorPendingError, setIsExecutorPendingError] = React.useState<string>('');

	useEffect(() => {
		const fetchExecutors = async () => {
			setIsExecutorPending(true);
			const res = await api.fetchExecutors();

			if (res.type === 'success') {
				setExecutorsList(res.data);
			} else {
				setIsExecutorPendingError(res.data as string);
			}

			setIsExecutorPending(false);
		};
		fetchExecutors().catch(console.error); // TODO create own useQuery
	}, []);

	const allFiltersBaseConfigMap = useMemo(() => {
		const result = allFiltersNamesList.reduce(
			(acc, name) => {
				const item = FiltersDataToShow[name];

				const it: FilterItemBaseType = {
					key: name,
					initialState: tableData[name].reduce((acc, item) => {
						return {
							...acc,
							[item]: true,
						};
					}, {}),
					filterKey: name,
					label: item.label,
					clearFilterFlag: true,
					filterIconComponent: (
						<Icon2 color="icon2" size={20} url={getIconUrlByName(item.filterIconComponentName)} />
					),
					filterFunction: item?.filterFunction as FilterItemBaseType['filterFunction'],
					onSetData: setters[name] as FilterItemBaseType['onSetData'],
					// dataToShow: item.data,
					withoutCheckAll: item.withoutCheckAll,
					// withoutCheckbox: item.withoutCheckbox,
					renderItem: item.renderItem as FilterItemBaseType['renderItem'],
					onClose: removeFilter,
				};
				acc[name] = it;
				return acc;
			},
			{} as Record<FiltersType, FilterItemBaseType>,
		);
		return result;
	}, [setters, tableData, removeFilter]);

	const filtersList = useMemo(() => {
		const result = filtersListShowed2.map((name) => {
			if (name === 'executor') {
				return {
					...allFiltersBaseConfigMap[name],
					dataToShow: executorsList,
					isDataLoading: isExecutorPending,
					isDataLoadingError: isExecutorPendingError,
				};
			}
			return {
				...allFiltersBaseConfigMap[name],
				isDataLoading: false, // isExecutorPending,
				isDataLoadingError: false,
				dataToShow: FiltersDataToShow[name].data,
			};
		});
		return result;
	}, [filtersListShowed2, executorsList, isExecutorPending, isExecutorPendingError]);

	// const [isOnFirstMount, setIsOnFirstMount] = React.useState(true);

	const [controlShowWhenCreate, setControlShowWhenCreate] = React.useState<string>('');

	const onClickOneElem = (name: string, isSelected: boolean) => {
		if (isSelected) {
			setControlShowWhenCreate(isSelected ? name : '');
		}
	};

	useEffect(() => {
		filtersListShowed2.forEach((item) => {});
	}, [filtersListShowed2]);

	return (
		<div style={{display: 'flex', justifyContent: 'space-between'}}>
			<div style={{display: 'flex', gap: '8px', paddingBlock: '20px'}}>
				{filtersList.map((it) => {
					return (
						<FilterItem
							openWhenCreate={controlShowWhenCreate === it.key}
							initialState={it.initialState}
							filterKey={it.key}
							key={it.key}
							// // recomment
							clearFilterFlag={clearAllFlag}
							label={it.label}
							filterIconComponent={it.filterIconComponent}
							onSetData={it.onSetData}
							// @ts-expect-error toremove
							dataToShow={it.dataToShow}
							renderItem={it.renderItem}
							onClose={it.onClose}
							filterFunction={it?.filterFunction}
							withoutCheckAll={it?.withoutCheckAll}
							isDataLoading={it?.isDataLoading}
							isDataLoadingError={it?.isDataLoadingError}
							// @ts-expect-error toremove
							onSubmitFilters={fetchByFiltersForce}
							onDropFilters={fetchByFiltersForce}
						/>
					);
				})}

				<div>
					<FilterItem
						sxButton={{
							width: '40px',
							height: '40px',
							justifyContent: 'center',
							alignItems: 'center',
						}}
						closeWhenSelect
						filterKey="add-filters"
						hideIfEmptyList
						withoutChest
						withoutCheckAll
						withoutActionsButtons
						withoutShowCount
						clearFilterFlag={clearAllFlag}
						controlledSetSelectedData={setFiltersListShowed}
						// @ts-expect-error toremove
						controlledSelectedData={filtersListShowed}
						filterIconComponent={<Icon2 color="icon2" size={20} url={getIconUrlByName('filterAdd')} />}
						// @ts-expect-error toremove
						onSetData={setFiltersListShowed2}
						onClickOneElem={onClickOneElem}
						dataToShow={filtersListNotShowed}
						renderItem={(item) => (
							<div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
								<Icon2
									sx={{opacity: 1}}
									color="icon2"
									size={20}
									url={getIconUrlByName(item.filterIconComponentName)}
								/>
								{item.label}
							</div>
						)}
					/>
				</div>
				<CustomFader withoutHeightCollapse timeout={300} className={`${isShowClearAll ? '' : 'hide'}`}>
					<ButtonStyled
						size="m"
						view="flatted"
						onClick={() => setClearAllFlag((prev) => !prev)}
						label="Очистить фильтры"
					/>
				</CustomFader>
			</div>
			<div style={{paddingBlock: '20px'}}>
				<CreateProposal />
			</div>
		</div>
	);
};

export default FiltersVariants;
