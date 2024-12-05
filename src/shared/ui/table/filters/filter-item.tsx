import React, {useEffect, useMemo, useRef, useState} from 'react';

import {CircularProgress, Popover} from '@mui/material';

import {InputField} from '../../input';
import {
	CheckAllMenuItem,
	ChestButton,
	ContentWrapper,
	CustomFader,
	FilterButton,
	SelectFooter,
	SelectMenuItem,
} from './filter-item/filter-button';

const popoverAnchorOrigin: React.ComponentProps<typeof Popover>['anchorOrigin'] = {
	vertical: 'bottom',
	horizontal: 'left',
};

type BaseItemType = {
	key: string | number;
	withoutCheckbox?: boolean;
};

type FiltersProps<T extends BaseItemType> = {
	initialState?: Record<T['key'], boolean>;
	onDropFilters?: () => void;
	onSubmitFilters?: (data: Partial<Record<T['key'], boolean>>) => void;
	hideIfEmptyList?: boolean;
	controlledSelectedData?: Record<T['key'], boolean>;
	controlledSetSelectedData?: (data: Record<T['key'], boolean>) => void;
	filterKey: string;
	onClose?: (filterKey: string) => void;
	withoutShowCount?: boolean;
	withoutChest?: boolean;
	withoutCheckAll?: boolean;
	dataToShow: T[];
	renderItem: (dataItem: T) => React.ReactNode;
	onSetData?: (data: string[]) => void;
	label: string;
	filterFunction?: (searchTerm: string, dataItem: T) => boolean;
	filterIconComponent?: React.ReactNode;
	withoutActionsButtons?: boolean;
	minPopupWidth?: string;
	maxPopupHeight?: string;
	clearFilterFlag?: boolean;
	isDataLoading?: boolean;
	errorDataLoading?: string;
};

const getSelectedKeysFromObject = (data: Record<string, boolean | undefined> | undefined) => {
	const allkeys = Object.keys(data ? data : {});
	const selectedKeys = allkeys.filter((key) => Boolean(data?.[key]));

	return selectedKeys;
};

export const FilterItem = <T extends BaseItemType>({
	isDataLoading,
	errorDataLoading,
	initialState,
	onSubmitFilters,
	onDropFilters,
	hideIfEmptyList,
	controlledSelectedData,
	controlledSetSelectedData,
	filterKey,
	onClose,
	withoutChest,
	withoutCheckAll,
	withoutShowCount,
	onSetData,
	filterFunction,
	dataToShow,
	renderItem,
	label,
	filterIconComponent,
	withoutActionsButtons,
	minPopupWidth,
	maxPopupHeight,
	clearFilterFlag,
}: FiltersProps<T>) => {
	const [_checkedData, _setCheckedData] = React.useState<Partial<Record<T['key'], boolean>>>(initialState || {});

	const checkedData = useMemo(() => {
		return controlledSelectedData ? controlledSelectedData : _checkedData;
	}, [controlledSelectedData, _checkedData]);

	const setCheckedData = useMemo(() => {
		const t = controlledSetSelectedData ? controlledSetSelectedData : _setCheckedData;
		return t as React.Dispatch<React.SetStateAction<Partial<Record<T['key'], boolean>>>>;
	}, [controlledSetSelectedData, _setCheckedData]);
	const checkedDataRef = useRef(checkedData);
	checkedDataRef.current = checkedData;

	const [checkedCount, setCheckedCount] = React.useState<number>(
		checkedData ? Object.values(checkedData).filter(Boolean).length : 0,
	);

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const isOpen = Boolean(anchorEl);
	const id = 'simple-popover';
	const [searchTerm, setSearchTerm] = useState('');
	const [isSelectedAll, setIsSelectedAll] = useState(false);
	const isSelectedAllRef = useRef(isSelectedAll);
	isSelectedAllRef.current = isSelectedAll;
	const isFirstRender = React.useRef(true);
	React.useEffect(() => {
		if (isFirstRender.current) return;
		setCheckedCount(checkedData ? Object.values(checkedData).filter(Boolean).length : 0);
		const selectedKeys = getSelectedKeysFromObject(checkedData);

		onSetData?.(selectedKeys);
	}, [checkedData]);

	const filteredDataList = React.useMemo(() => {
		const filtered = !filterFunction ? dataToShow : dataToShow.filter((item) => filterFunction(searchTerm, item));

		return filtered;
	}, [searchTerm, dataToShow, filterFunction]);

	useEffect(() => {
		if (
			filteredDataList?.length > 0 &&
			filteredDataList.every((item) => checkedDataRef.current?.[item.key as T['key']])
		) {
			if (!isSelectedAllRef.current) setIsSelectedAll(true);
		} else {
			setIsSelectedAll(false);
		}
	}, [checkedData, filteredDataList]);

	const handleDeselectAll = () => {
		setCheckedData({});
		setIsSelectedAll(false);
	};

	const handleDeselectAllCurrent = () => {
		setIsSelectedAll(false);
		setCheckedData((prev) => {
			return {
				...prev,
				...filteredDataList.reduce((acc, item) => ({...acc, [item.key]: false}), {}),
			};
		});
	};

	const handleSelectAllCurrent = () => {
		setIsSelectedAll(true);
		setCheckedData((prev) => {
			return {
				...prev,
				...filteredDataList.reduce((acc, item) => ({...acc, [item.key]: true}), {}),
			};
		});
	};

	useEffect(() => {
		if (isFirstRender.current) return;
		handleDeselectAll();
	}, [clearFilterFlag]);

	useEffect(() => {
		isFirstRender.current = false;
	}, []);

	const onSelectAllClick = () => {
		if (isSelectedAllRef.current) {
			handleDeselectAllCurrent();
		} else {
			handleSelectAllCurrent();
		}
	};

	const [checkedCountFreezeBeforeClose, setCheckedCountFreezeBeforeClose] = useState(checkedCount);
	useEffect(() => {
		if (checkedCount !== 0) setCheckedCountFreezeBeforeClose(checkedCount);
	}, [checkedCount]);

	useEffect(() => {
		if (!filteredDataList?.length && hideIfEmptyList) {
			setAnchorEl(null);
		}
	}, [filteredDataList, hideIfEmptyList]);

	const onPopoverClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const target = e.target as HTMLElement;

		const itemId = target.closest('[data-item-id]')?.getAttribute('data-item-id') as T['key']; //(T[0]['key'];
		if (itemId) {
			setCheckedData((prev) => {
				if (!prev) return {[itemId]: true} as Partial<Record<T['key'], boolean>>;

				return {
					...prev,
					[itemId]: !prev?.[itemId],
				} as Partial<Record<T['key'], boolean>>;
			});
		}
	};

	if (!filteredDataList?.length && hideIfEmptyList) return null;

	return (
		<div>
			<FilterButton onClick={handleClick}>
				<div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
					{filterIconComponent}
					{Boolean(label) && <label>{label}</label>}
				</div>

				{!withoutShowCount && (
					<CustomFader className={`count-info ${!checkedCount && 'hide'}`}>
						<div>{checkedCountFreezeBeforeClose}</div>
					</CustomFader>
				)}

				{!withoutChest && (
					<ChestButton
						onClick={(e) => {
							e.stopPropagation();
							handleDeselectAll();
							onClose?.(filterKey);
						}}
					/>
				)}
			</FilterButton>
			<Popover
				id={id}
				open={isOpen}
				anchorEl={anchorEl}
				onClose={handleClose}
				onClick={onPopoverClick}
				anchorOrigin={popoverAnchorOrigin}
			>
				{Boolean(filterFunction) && (
					<InputField
						isWithoutErrors
						sizeInput="medium"
						debounceMs={500}
						onChangeValue={setSearchTerm}
						isWithClearButton
						sxWrapper={{margin: '8px '}}
					/>
				)}
				{!withoutCheckAll && (
					<CheckAllMenuItem
						disabled={!filteredDataList?.length || isDataLoading}
						onClick={onSelectAllClick}
						isSelectedAll={isSelectedAll}
					/>
				)}
				<div style={{borderBottom: '1px solid rgba(234, 234, 234, 1)'}}></div>

				<ContentWrapper maxPopupHeight={maxPopupHeight} minPopupWidth={minPopupWidth}>
					{isDataLoading ? (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								alignSelf: 'center',
								justifySelf: 'center',
								maxWidth: '50px',
								minHeight: '50px',
							}}
						>
							<CircularProgress size={30} />
						</div>
					) : !filteredDataList?.length ? (
						<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Пусто</div>
					) : (
						filteredDataList.map((item) => {
							return (
								<SelectMenuItem
									withoutCheckbox={item.withoutCheckbox}
									key={item.key}
									itemKey={item.key}
									isChecked={checkedData?.[item.key as T['key']] || false}
								>
									{renderItem?.(item)}
								</SelectMenuItem>
							);
						})
					)}
				</ContentWrapper>
				{!withoutActionsButtons && (
					<SelectFooter
						onDropFilters={() => {
							handleDeselectAll();
							onDropFilters?.();
						}}
						onSubmitFilters={() => {
							handleClose();

							onSubmitFilters?.(checkedData);
						}}
					/>
				)}
			</Popover>
		</div>
	);
};
