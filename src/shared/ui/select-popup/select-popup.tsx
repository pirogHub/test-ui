import React from 'react';

import {ListItems} from '@/pages/dashboard/page-filters/filter/filter-components/filter-components';
import {Popover} from '@mui/material';

export const SelectPopup = ({
	closePopup,
	anchorElRef,
	isPopupOpenSafe,
	noCheckbox,
	onSelectItem,
	hideIfChecked,
	isDataLoading,
	errorLoadingDataMessage,
	// allList,
	alreadySelected,
	renderItem,
	ParentComponentId,
	filteredDataToShow,
	minListWidth,
	popoverAnchorOrigin,
	transformOrigin,
	...props
}: {
	closePopup: () => void;
	ParentComponentId: string;
	anchorElRef: React.RefObject<HTMLDivElement>;
	onSelectItem: (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => void;
	isPopupOpenSafe: boolean;
	// allList: {id: string; name: string}[];
	filteredDataToShow: {id: string; name: string}[];
	alreadySelected: Record<string, boolean>;
	noCheckbox?: boolean;
	hideIfChecked?: boolean;
	isDataLoading?: boolean;
	errorLoadingDataMessage?: string;
	renderItem?: (item: {id: string; name: string}) => React.ReactNode;
	minListWidth?: string;
	popoverAnchorOrigin?: React.ComponentProps<typeof Popover>['anchorOrigin'];
	transformOrigin: React.ComponentProps<typeof Popover>['transformOrigin'];
}) => {
	return (
		<Popover
			id={isPopupOpenSafe ? `popup-menu-${ParentComponentId}` : undefined}
			open={isPopupOpenSafe}
			// @ts-expect-error toremove
			anchorEl={() => anchorElRef.current || null} // TODO подумать над оптимизацией
			onClose={closePopup}
			anchorOrigin={popoverAnchorOrigin}
			transformOrigin={transformOrigin}
			sx={{
				marginTop: '5px',
			}}
		>
			{/* <FilterHeader>
				{withThisSearchFunction ? <SearchTermInput setSearchTerm={setSearchTerm} /> : null}
				{withCheckAll && (
					<CheckAllMenuItem
						disabled={!filteredDataToShow?.length || isDataLoading}
						onClick={() => selectCurrentDeselectAll({select: !isAllShowedSelected})}
						isSelectedAll={isAllShowedSelected}
					/>
				)}

				<FIlterDivider />
			</FilterHeader> */}
			<div style={{...(minListWidth ? {minWidth: minListWidth} : {})}}>
				<ListItems
					noCheckbox={noCheckbox}
					onSelectItem={onSelectItem}
					hideIfChecked={hideIfChecked}
					isDataLoading={isDataLoading}
					errorLoadingDataMessage={errorLoadingDataMessage}
					allList={filteredDataToShow}
					alreadySelected={alreadySelected}
					renderItem={renderItem} // TODO
				/>
			</div>
			{/* {!noFooterActions && (
				<FilterFooter
					disableButtons={isDataLoading}
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
			)} */}
		</Popover>
	);
};
