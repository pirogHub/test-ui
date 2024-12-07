import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {
	FiltersNamesType,
	ProposalExecutorIdType,
	ProposalExecutorType,
	ProposalFilterRecordType,
	ProposalSetFilterActionType,
	ProposalStatusIdList,
	ProposalTypeIdList,
} from '@/state/types';
import {skyAllianceMUITheme} from '@/styles/theme';
import {CircularProgress, Popover, styled} from '@mui/material';

import {CustomFader} from '@/shared/ui/custom-fade/custom-fade';
import {InputField} from '@/shared/ui/input';
import {CheckAllMenuItem, ChestButton, FilterButton} from '@/shared/ui/table/filters/filter-item/filter-button';

import {
	DataLoading,
	FIlterDivider,
	FilterFooter,
	FilterHeader,
	FilterRoot,
	ListItems,
	SearchTermInput,
	popoverAnchorOrigin,
} from './filter-components/filter-components';

type NewFilterProps<FilterItemKeyType extends string, AllListItemType extends {id: FilterItemKeyType; name: string}> = {
	minListWidth?: string;
	noCheckbox?: boolean;
	withoutShowCount?: boolean;
	filterIconComponent?: React.ReactNode;
	filterId: string; // | FiltersNamesType;
	hideIfEmpty?: boolean;
	hideIfChecked?: boolean;
	noFooterActions?: boolean;
	withThisSearchFunction?: (item: AllListItemType, searchTerm: string) => boolean;
	filterName?: string;
	allList: AllListItemType[];
	alreadySelected: Partial<Record<FilterItemKeyType, boolean>>;
	// onSelect: (keysArr: {key: FilterItemKeyType; val: boolean}[]) => void;
	onSelect: (val: ProposalSetFilterActionType<FilterItemKeyType>) => void;
	isDataLoading?: boolean;
	errorLoadingDataMessage?: string;
	onFilterRemove?: () => void;
	onPopupClose?: () => void;
	onFilterValuesDrop?: () => void;
	onSubmitFilter?: () => void;
	closeWhenSelect?: boolean;
	withCheckAll?: boolean;
	withoutChest?: boolean;
	// label: string;
	renderItem: (item: AllListItemType) => React.ReactNode;
	openWhenCreate?: boolean;
};

export const NewFilter = <
	FilterItemKeyType extends string,
	AllListItemType extends {id: FilterItemKeyType; name: string},
>({
	minListWidth,
	withoutShowCount,
	filterIconComponent,
	filterId,
	onPopupClose,
	onFilterValuesDrop,
	onSubmitFilter,
	closeWhenSelect,
	withCheckAll,
	withoutChest,
	hideIfEmpty,
	hideIfChecked,
	noFooterActions,
	withThisSearchFunction,
	filterName,
	allList,
	alreadySelected,
	onSelect,
	isDataLoading,
	errorLoadingDataMessage,
	onFilterRemove,
	// label,
	renderItem,
	openWhenCreate,
	noCheckbox,
}: NewFilterProps<FilterItemKeyType, AllListItemType>) => {
	// const alreadySelected: Record<string, boolean> = {};

	const [filteredDataToShow, setFilteredDataToShow] = React.useState(allList);

	// popup settings
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const anchorElRef = React.useRef<HTMLButtonElement | null>(null);
	const anchorEl = anchorElRef.current;

	const onSelectItem = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
		const target = e.target as HTMLElement;

		const item = target.closest('[data-select-item-id]');
		const itemId = item?.getAttribute('data-select-item-id') as FilterItemKeyType; //(T[0]['key'];
		if (!itemId) return;
		const isChecked = item?.getAttribute('data-select-is-checked') === 'true' ? true : false;

		onSelect([[{id: itemId, val: !isChecked}]]);
		if (closeWhenSelect) {
			setIsPopupOpen(false);
		}
	};

	const allCheckedCount = useMemo(
		() => (alreadySelected ? Object.keys(alreadySelected).length : undefined),
		[alreadySelected],
	);

	const allShowedCheckedCount = useMemo(() => {
		const allShowedSelectedCount = filteredDataToShow.length
			? filteredDataToShow.filter((i) => alreadySelected[i.id]).length
			: 0;
		console.log('allShowedSelectedCount', allShowedSelectedCount);

		// return filteredDataToShow.length === allShowedSelectedCount;
		return allShowedSelectedCount;
	}, [alreadySelected, filteredDataToShow]);

	const isAllShowedSelected = useMemo(() => {
		const isAllShowedSelected = filteredDataToShow.length
			? filteredDataToShow.every((i) => alreadySelected[i.id])
			: false;
		return isAllShowedSelected;
	}, [alreadySelected, filteredDataToShow]);
	const isAllSelected = useMemo(() => {
		const isAllSelected = allList.length ? allList.every((i) => alreadySelected[i.id]) : false;
		return isAllSelected;
	}, [alreadySelected, allList]);

	const [searchTerm, setSearchTerm] = React.useState('');

	useEffect(() => {
		if (withThisSearchFunction && searchTerm !== undefined) {
			const filteredList = allList.filter((i) => withThisSearchFunction(i, searchTerm));
			setFilteredDataToShow(filteredList);
		}
	}, [searchTerm, setFilteredDataToShow]);

	const closePopup = useCallback(() => {
		setIsPopupOpen(false);
		onPopupClose?.();
	}, [setIsPopupOpen, onPopupClose]);

	const selectCurrentDeselectAll = useCallback(
		({select}: {select: boolean}) => {
			if (select) {
				onSelect([filteredDataToShow, true]);
			} else {
				// onSelect([allList, false]);
				onSelect([filteredDataToShow, false]);
			}
			// closePopup();
		},
		[onSelect, filteredDataToShow],
	);

	const isPopupOpenSafe = Boolean(anchorEl) && isPopupOpen;

	const onRemoveFilterClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			e.stopPropagation();
			selectCurrentDeselectAll({select: false});
			onFilterRemove?.();
		},
		[selectCurrentDeselectAll, onFilterRemove],
	);

	useEffect(() => {
		if (hideIfEmpty && isAllSelected) {
			setIsPopupOpen(false);
		}
	}, [hideIfEmpty, isAllSelected]);

	// useEffect(() => {
	// 	if (openWhenCreate && anchorElRef.current) {
	// 		setIsPopupOpen(true);
	// 	}
	// }, [openWhenCreate, anchorElRef]);

	useEffect(() => {
		// toremove
		if (openWhenCreate) {
			setIsPopupOpen(true);
		}
	}, [openWhenCreate]);

	const [allCheckedCountFreezeBeforeClose, setCheckedCountFreezeBeforeClose] = useState(allCheckedCount);
	useEffect(() => {
		if (allCheckedCount !== 0) setCheckedCountFreezeBeforeClose(allCheckedCount);
	}, [allCheckedCount]);

	if (hideIfEmpty && isAllSelected) return null;
	return (
		<FilterRoot>
			<FilterButton
				// sx={sxButton}
				ref={anchorElRef}
				onClick={() => {
					setIsPopupOpen(true);
				}}
				className="header"
				isOnlyIcon={!filterName}
			>
				{filterIconComponent}
				{filterName && <span className="fliter-name">{filterName}</span>}
				{!withoutShowCount && (
					<CustomFader className={`${!allCheckedCount && 'hide'}`}>
						<CheckedCountInfo>{allCheckedCountFreezeBeforeClose}</CheckedCountInfo>
					</CustomFader>
				)}

				{!withoutChest && <ChestButton onClick={onRemoveFilterClick} />}
			</FilterButton>
			<Popover
				id={isPopupOpenSafe ? `popup-menu-${filterId}` : undefined}
				open={isPopupOpenSafe}
				// @ts-expect-error toremove
				anchorEl={() => anchorElRef.current || null}
				onClose={closePopup}
				anchorOrigin={popoverAnchorOrigin}
				sx={{
					marginTop: '5px',
				}}
			>
				<FilterHeader>
					{withThisSearchFunction ? <SearchTermInput setSearchTerm={setSearchTerm} /> : null}
					{withCheckAll && (
						<CheckAllMenuItem
							disabled={!filteredDataToShow?.length || isDataLoading}
							onClick={() => selectCurrentDeselectAll({select: !isAllShowedSelected})}
							isSelectedAll={isAllShowedSelected}
						/>
					)}

					<FIlterDivider />
				</FilterHeader>
				<div style={{...(minListWidth ? {minWidth: minListWidth} : {})}}>
					<ListItems
						noCheckbox={noCheckbox}
						onSelectItem={onSelectItem}
						hideIfChecked={hideIfChecked}
						isDataLoading={isDataLoading}
						errorLoadingDataMessage={errorLoadingDataMessage}
						allList={filteredDataToShow}
						alreadySelected={alreadySelected}
						renderItem={renderItem}
					/>
				</div>
				{!noFooterActions && (
					<FilterFooter
						disableButtons={isDataLoading}
						// disableFilterDrop={allCheckedCount === 0}
						disableFilterDrop={allShowedCheckedCount === 0}
						onSubmitFilter={() => {
							setIsPopupOpen(false);
							onSubmitFilter?.();
						}}
						onFilterDrop={() => {
							onSelect([filteredDataToShow, false]);
							onFilterValuesDrop?.();
						}}
					/>
				)}
			</Popover>
		</FilterRoot>
	);
};

export type NewFilterSortFunctionType<
	KeysIdType extends string,
	AllListItemType extends {id: KeysIdType; name: string},
> = Exclude<React.ComponentProps<typeof NewFilter<KeysIdType, AllListItemType>>['withThisSearchFunction'], undefined>;

export const CheckedCountInfo = styled('div')`
	padding: 4px;
	border-radius: 5px;
	background-color: ${(p) => (p.theme as skyAllianceMUITheme).colors.backgroundAccent};
	color: ${(p) => (p.theme as skyAllianceMUITheme).colors.primary1};
	width: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 11px;
	font-weight: 600;
`;
