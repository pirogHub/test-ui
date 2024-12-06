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
import {CircularProgress, Popover, styled} from '@mui/material';

import {InputField} from '@/shared/ui/input';
import {CheckAllMenuItem, ChestButton, FilterButton} from '@/shared/ui/table/filters/filter-item/filter-button';

const DataLoading = () => {
	return (
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
	);
};

const ListItems = <FilterItemKeyType extends string, AllListItemType extends {id: FilterItemKeyType; name: string}>({
	hideIfChecked,
	allList,
	alreadySelected,
	isDataLoading,
	errorLoadingDataMessage,
}: {
	hideIfChecked?: boolean;
	errorLoadingDataMessage?: string;
	isDataLoading?: boolean;
	allList: AllListItemType[];
	alreadySelected: Partial<Record<FilterItemKeyType, boolean>>;
}) => {
	if (errorLoadingDataMessage !== undefined) return <div>{errorLoadingDataMessage}</div>;
	if (isDataLoading) return <DataLoading />;
	return allList.length === 0
		? 'no data'
		: allList.map(({id, name}) => {
				const isChecked = alreadySelected[id] ? '+' : '-';
				const isCheckedBool = alreadySelected[id];
				return hideIfChecked && isCheckedBool ? null : (
					<li data-select-item-id={id} data-select-isChecked={alreadySelected[id]} key={id}>
						{isChecked} {name}
					</li>
				);
			});
};

const FilterRoot = styled('div')`
	display: flex;
	gap: 10px;
	flex-direction: column;
	padding-inline: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	background-color: #f3edf3;

	& .header {
		padding-top: 10px;
	}
	& .fliter-name {
		font-weight: 600;
	}

	& .footer {
		display: flex;
		gap: 10px;
		flex-direction: column;
	}

	& ul {
		padding: 0;
		margin: 0;
	}
	& li {
		list-style: none;
		border: 1px solid #dddcdc;
		margin-block: 2px;
		cursor: pointer;

		&:hover {
			background-color: #dddcdc;
		}
	}
`;

const popoverAnchorOrigin: React.ComponentProps<typeof Popover>['anchorOrigin'] = {
	vertical: 'bottom',
	horizontal: 'left',
};

type NewFilterProps<FilterItemKeyType extends string, AllListItemType extends {id: FilterItemKeyType; name: string}> = {
	filterIconComponent?: React.ReactNode;
	filterId: string; // | FiltersNamesType;
	hideIfEmpty?: boolean;
	hideIfChecked?: boolean;
	noFooterActions?: boolean;
	withThisSearchFunction?: (item: AllListItemType, searchTerm: string) => boolean;
	filterName: string;
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
	label: string;
	renderItem: (item: AllListItemType) => React.ReactNode;
	openWhenCreate?: boolean;
};

export const NewFilter = <
	FilterItemKeyType extends string,
	AllListItemType extends {id: FilterItemKeyType; name: string},
>({
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
	label,
	renderItem,
	openWhenCreate,
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
		const isChecked = item?.getAttribute('data-select-isChecked') === 'true' ? true : false;

		onSelect([[{id: itemId, val: !isChecked}]]);
		if (closeWhenSelect) {
			setIsPopupOpen(false);
		}
	};

	const selectedCount = useMemo(
		() => (alreadySelected ? Object.keys(alreadySelected).length : undefined),
		[alreadySelected],
	);

	const isAllSelected = useMemo(() => {
		const isAllShowedSelected = filteredDataToShow.length
			? filteredDataToShow.every((i) => alreadySelected[i.id])
			: false;
		return isAllShowedSelected;
	}, [alreadySelected, filteredDataToShow]);

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
				onSelect([allList, false]);
			}
			closePopup();
		},
		[onSelect, filteredDataToShow],
	);

	const isPopupOpenSafe = Boolean(anchorEl) && isPopupOpen;

	useEffect(() => {
		if (hideIfEmpty && isAllSelected) {
			setIsPopupOpen(false);
		}
	}, [hideIfEmpty, isAllSelected]);

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
			>
				<span className="fliter-name">{filterName}</span>
				{!withoutChest && (
					<ChestButton
						onClick={(e) => {
							e.stopPropagation();
							selectCurrentDeselectAll({select: false});
							onFilterRemove?.();
						}}
					/>
				)}
			</FilterButton>
			<Popover
				id={isPopupOpenSafe ? `popup-menu-${filterId}` : undefined}
				open={isPopupOpenSafe}
				// anchorEl={anchorEl}
				// @ts-expect-error toremove
				anchorEl={() => anchorElRef.current || null}
				onClose={closePopup}
				anchorOrigin={popoverAnchorOrigin}
				sx={{
					marginTop: '5px',
				}}
			>
				{withThisSearchFunction ? (
					<InputField
						isWithClearButton
						isWithoutErrors
						debounceMs={500}
						onChangeValue={setSearchTerm}
						sizeInput="medium"
						sxWrapper={{margin: '8px '}}
					/>
				) : null}
				{withCheckAll && (
					<CheckAllMenuItem
						disabled={!filteredDataToShow?.length || isDataLoading}
						onClick={() => selectCurrentDeselectAll({select: true})}
						isSelectedAll={isAllSelected}
					/>
				)}
				<div style={{borderBottom: '1px solid rgba(234, 234, 234, 1)'}}></div>

				<ul className="list" onClick={onSelectItem}>
					<ListItems
						hideIfChecked={hideIfChecked}
						isDataLoading={isDataLoading}
						errorLoadingDataMessage={errorLoadingDataMessage}
						allList={filteredDataToShow}
						alreadySelected={alreadySelected}
					/>
				</ul>
				{!noFooterActions && (
					<div className="footer">
						<div className="controls">
							<button onClick={onSubmitFilter}>Submit</button>
							<button
								onClick={() => {
									// selectDeselectAll({select: false});
									onSelect([filteredDataToShow, false]);
									onFilterValuesDrop?.();
								}}
							>
								clear all
							</button>
						</div>

						<span className="info">isAllSelected: {isAllSelected ? '+' : '-'}</span>
					</div>
				)}
			</Popover>
		</FilterRoot>
	);
};

export type NewFilterSortFunctionType<
	KeysIdType extends string,
	AllListItemType extends {id: KeysIdType; name: string},
> = Exclude<React.ComponentProps<typeof NewFilter<KeysIdType, AllListItemType>>['withThisSearchFunction'], undefined>;
