import React from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {skyAllianceMUITheme} from '@/styles/theme';
import {Checkbox, MenuItem, styled} from '@mui/material';

import {getIconUrlByName} from '@/shared/icons/icons-data';
import {Icon2} from '@/shared/ui/icon';

export const FilterButton = styled('button', {
	shouldForwardProp: (propName) => propName !== 'isOnlyIcon',
})<{isOnlyIcon?: boolean}>`
	position: relative;
	display: flex;
	align-items: center;
	gap: 6px;
	cursor: pointer;
	border: none;
	outline: none;
	border-radius: 12px;
	height: 40px;
	border: 1px solid ${(p) => (p.theme as skyAllianceMUITheme).colors.base4};
	color: ${(p) => (p.theme as skyAllianceMUITheme).colors.text2};
	background-color: ${(p) => (p.theme as skyAllianceMUITheme).colors.base1};

	${(p) =>
		p.isOnlyIcon &&
		`
	justify-content: center;
	width: 40px;
	`}

	&:hover,
	&.hover {
		background-color: ${(p) => (p.theme as skyAllianceMUITheme).colors.base5}; // TODO id=3453450
	}

	&:active,
	&.active {
	}

	&:disabled,
	&.disabled {
		cursor: 'default';

		opacity: '0.4';

		& .SkyIcon {
			background-color: ${(p) => (p.theme as skyAllianceMUITheme).colors.icon2};
		}
	}

	& label {
		font-size: 14px;
		font-weight: 600;
		line-height: 20px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		cursor: pointer;
	}
	transition: gap 0.05s cubic-bezier(1, 0.01, 1, 1.2);
	&:has(div.hide) {
		gap: 3px;
	}
	& .count-info {
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
	}
`;

const ChestWrapper = styled('div')`
	display: flex;
	align-items: center;
	gap: 0;
	border-radius: 4px;

	&:hover {
		background-color: #ddd;

		& .SkyIcon {
			background-color: #fff;
		}
	}
`;

export const ChestButton: React.FC<{onClick: (e: React.MouseEvent<HTMLDivElement>) => void}> = ({onClick}) => {
	return (
		<ChestWrapper>
			<Icon2 onClick={onClick} sx={{opacity: 1}} color="icon2" size={20} url={getIconUrlByName('chest')} />
		</ChestWrapper>
	);
};

export const StyledMenuItem = styled(MenuItem)`
	.muitouchripple-root {
		display: none;
	}
	border-radius: 4px;
	width: 100%;
	height: 40px;
	padding-left: 4px;
	gap: 12px;
	width: 100%;
`;

export const SelectMenuItem: React.FC<
	React.PropsWithChildren<{itemKey: string | number; withoutCheckbox?: boolean; isChecked?: boolean}>
> = ({itemKey, withoutCheckbox, isChecked, children}) => {
	return (
		<StyledMenuItem data-item-id={itemKey} disableRipple>
			{withoutCheckbox ? null : (
				<Checkbox size="small" sx={{padding: '0'}} disableRipple checked={isChecked || false} />
			)}
			{children}
		</StyledMenuItem>
	);
};

export const CheckAllMenuItem: React.FC<{
	disabled?: boolean;
	isSelectedAll: boolean;
	onClick: () => void;
}> = ({disabled, isSelectedAll, onClick}) => {
	return (
		<div
			onClick={disabled ? undefined : onClick}
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '8px',
				paddingInline: '13px 8px',
				paddingBlock: '8px',
				opacity: disabled ? 0.4 : 1,
			}}
		>
			<StyledMenuItem disableRipple>
				<Checkbox
					id="check-all"
					size="small"
					sx={{cursor: disabled ? 'default' : 'pointer', padding: '0'}}
					disableRipple
					checked={isSelectedAll}
					disabled={disabled}
					// inputProps={{'aria-label': 'controlled'}}
				/>
				<label style={{cursor: disabled ? 'default' : 'pointer', width: '100%'}}>Выбрать все</label>
			</StyledMenuItem>
		</div>
	);
};

export const ContentWrapper: React.FC<React.PropsWithChildren<{minPopupWidth?: string; maxPopupHeight?: string}>> = ({
	children,
	maxPopupHeight,
	minPopupWidth,
}) => {
	return (
		<div style={{padding: '8px'}}>
			<div
				style={{
					minWidth: minPopupWidth || '224px',
					maxHeight: maxPopupHeight || '200px',
					overflow: 'auto',
				}}
			>
				<div
					style={{
						boxSizing: 'border-box',
						minHeight: '100%',
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export const SelectFooter: React.FC<{onDropFilters: () => void; onSubmitFilters: () => void}> = ({
	onDropFilters,
	onSubmitFilters,
}) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				padding: '10px 12px 10px 12px',
				borderTop: '1px solid rgba(234, 234, 234, 1)',
			}}
		>
			<div style={{display: 'flex', gap: '8px'}}>
				<ButtonStyled size="s" view="outline" onClick={onDropFilters}>
					Сбросить
				</ButtonStyled>
				<ButtonStyled size="s" view="primary" onClick={onSubmitFilters}>
					Применить
				</ButtonStyled>
			</div>
		</div>
	);
};

export const CustomFader = styled('div', {
	shouldForwardProp: (propName) =>
		propName !== 'timeout' && propName !== 'withoutHeightCollapse' && propName !== 'withoutWidthCollapse',
})<{timeout?: number; withoutHeightCollapse?: boolean; withoutWidthCollapse?: boolean}>`
	/* transition: all 0.12s cubic-bezier(1, 0.01, 1, 1.2); */
	transition: all ${(p) => p.timeout || '120'}ms cubic-bezier(1, 0.01, 1, 1.2);
	white-space: nowrap;
	overflow: hidden;
	width: 100%;
	&.hide {
		transition: all ${(p) => p.timeout || '120'}ms cubic-bezier(1, 0.01, 1, 1.2);

		width: ${(p) => (p.withoutWidthCollapse ? '100%' : 0)};
		height: ${(p) => (p.withoutHeightCollapse ? 'auto' : 0)};
		opacity: 0;

		padding: 0;
		font-size: 0;
	}
`;
