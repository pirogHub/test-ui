import React, {useEffect, useMemo} from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {Checkbox, CircularProgress, Popover, styled} from '@mui/material';

import {InputField} from '@/shared/ui/input';

export const FilterRoot = styled('div')`
	display: flex;
	gap: 10px;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& .header {
	}
	& .fliter-name {
		font-weight: 600;
	}
`;

export const DataLoading = () => {
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

export const popoverAnchorOrigin: React.ComponentProps<typeof Popover>['anchorOrigin'] = {
	vertical: 'bottom',
	horizontal: 'left',
};

export const FIlterDivider = () => {
	return <div style={{borderBottom: '1px solid rgba(234, 234, 234, 1)'}}></div>;
};

const StyledFilterFooter = styled('div')`
	display: flex;

	flex-direction: column;

	padding: 8px 12px 10px 12px;

	border-top: 1px solid rgba(234, 234, 234, 1);

	& .controls {
		display: flex;
		gap: 20px;
	}
`;

export const FilterFooter: React.FC<{
	onSubmitFilter?: () => void;
	onFilterDrop: () => void;
	disableButtons?: boolean;
	disableFilterDrop?: boolean;
}> = ({onSubmitFilter, onFilterDrop, disableButtons, disableFilterDrop}) => {
	return (
		<StyledFilterFooter>
			<div className="controls">
				<ButtonStyled disabled={disableFilterDrop || disableButtons} view="flatted" onClick={onFilterDrop}>
					Сбросить
				</ButtonStyled>
				<ButtonStyled disabled={disableButtons} onClick={onSubmitFilter}>
					Применить
				</ButtonStyled>
			</div>

			{/* <span className="info">isAllSelected: {isAllSelected ? '+' : '-'}</span> */}
		</StyledFilterFooter>
	);
};

export const FilterHeader: React.FC<React.PropsWithChildren> = ({children}) => <>{children}</>;

export const SearchTermInput: React.FC<{setSearchTerm: React.Dispatch<React.SetStateAction<string>>}> = ({
	setSearchTerm,
}) => {
	return (
		<InputField
			label="Поиск"
			isWithClearButton
			isWithoutErrors
			debounceMs={500}
			onChangeValue={setSearchTerm}
			sizeInput="medium"
			sxWrapper={{margin: '8px '}}
		/>
	);
};

const ListItemsRoot = styled('div')`
	padding: 5px;
	& ul {
		padding: 0;
		margin: 0;

		max-height: 150px;
		overflow: auto;
	}

	& li {
		list-style: none;
		height: 36px;
		cursor: pointer;
		padding: 8px 12px;
		display: flex;
		gap: 12px;
		justify-content: start;
		align-items: center;

		&:hover {
			background-color: rgba(234, 247, 255, 1);
		}
	}
`;

const EmptySearchMessage = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 36px;
`;

export const ListItems = <
	FilterItemKeyType extends string,
	AllListItemType extends {id: FilterItemKeyType; name: string},
>({
	noCheckbox,
	hideIfChecked,
	allList,
	alreadySelected,
	isDataLoading,
	errorLoadingDataMessage,
	onSelectItem,
	renderItem,
}: {
	noCheckbox?: boolean;
	hideIfChecked?: boolean;
	errorLoadingDataMessage?: string;
	isDataLoading?: boolean;
	allList: AllListItemType[];
	alreadySelected: Partial<Record<FilterItemKeyType, boolean>>;
	renderItem: (item: AllListItemType) => React.ReactNode;
	onSelectItem: (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => void;
}) => {
	if (errorLoadingDataMessage !== undefined) return <div>Ошибка: {errorLoadingDataMessage}</div>;
	if (isDataLoading) return <DataLoading />;
	return allList?.length === 0 ? (
		<EmptySearchMessage>Пусто</EmptySearchMessage>
	) : (
		<ListItemsRoot>
			<ul onClick={onSelectItem}>
				{allList?.map((item) => {
					const {id, name} = item;
					const isCheckedBool = alreadySelected[id];
					return hideIfChecked && isCheckedBool ? null : (
						<li data-select-item-id={id} data-select-is-checked={alreadySelected[id] || false} key={id}>
							{!noCheckbox && (
								<Checkbox
									size="small"
									sx={{padding: '0'}}
									disableRipple
									checked={isCheckedBool || false}
								/>
							)}
							{renderItem ? renderItem(item) : name}
						</li>
					);
				})}
			</ul>
		</ListItemsRoot>
	);
};
