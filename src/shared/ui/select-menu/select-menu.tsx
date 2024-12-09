import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react';

import {skyAllianceMUITheme} from '@/styles/theme';
import {Box, Fade, Popover, SxProps, styled} from '@mui/material';
import clsx from 'clsx';

import {useDebounce} from '@/shared/hooks/use-debounce';
import {getIconUrlByName} from '@/shared/icons/icons-data';

import {Icon2} from '../icon/icon';
import {SelectPopup} from '../select-popup/select-popup';
import SkyChevron from '../sky-chevron/sky-chevron';
import SkyTooltipBase from '../sky-tooltip/sky-tooltip-base';
import SkyTooltipIconHelper from '../sky-tooltip/sky-tooltip-icon-helper';

const RowsWrapper = styled('div', {
	label: 'rows-wrapper',
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
})<{}>`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const Root = styled('div', {
	label: 'select-menu-root',
	shouldForwardProp: (prop) => prop !== 'size',
})<{size?: string}>`
	border: 1px solid ${({theme}) => (theme as skyAllianceMUITheme).colors.base4};
	border-radius: 12px;
	display: inline-flex;
	background-color: ${({theme}) => (theme as skyAllianceMUITheme).colors.base1};

	height: ${(p) => (p.size === 'medium' ? '44px' : '56px')};
	box-sizing: border-box;
	padding-inline: 12px;
	justify-content: space-between;
	outline: none;
	width: 100%;

	&.select-list {
		cursor: pointer;

		&:hover {
			background-color: ${(p) => (p.theme as skyAllianceMUITheme).colors.base5}; // TODO id=3453450
		}
	}

	&:has(input:focus),
	&.focus {
		outline: 2px solid ${({theme}) => (theme as skyAllianceMUITheme).colors.primary1};
	}
	&.error,
	&.error:has(input:focus) {
		outline: 2px solid ${({theme}) => (theme as skyAllianceMUITheme).colors.error};
	}

	& label {
		position: absolute;
		left: 5px;
		top: 50%;
		transform: translateY(-50%);
		/* width: 50px; */
		text-align: center;
		pointer-events: none;
		transition: 0.3s ease all;
		font-size: 15px;
		color: ${({theme}) => (theme as skyAllianceMUITheme).colors.text3};
	}

	& input:focus + label {
		position: absolute;
		left: 0;
		transform: ${(p) =>
			p.size === 'medium' ? 'translateY(-130%) translateX(3%)' : 'translateY(-150%) translateX(-10%)'};

		/* width: 50px; */
		text-align: center;
		transition: 0.2s ease all;
		font-size: ${(p) => (p.size === 'medium' ? '11px' : '13px')};
	}
	& label.onManualTop {
		position: absolute;
		left: 0;
		transform: translateY(-150%) translateX(0);
		/* width: 50px; */
		text-align: center;
		transition: 0.2s ease all;
		font-size: ${(p) => (p.size === 'medium' ? '11px' : '13px')};
	}

	& .placeholder {
		position: absolute;
		height: 30px;
		inset: 0;
		left: 4px;
		display: flex;
		text-align: center;
		pointer-events: none;
		transition: 0.3s ease all;
		justify-content: start;
		align-items: center;
		line-height: 16px;
		font-size: 13px;
		color: ${({theme}) => (theme as skyAllianceMUITheme).colors.text4};
	}
`;

export const FormFieldInput = styled('div', {
	shouldForwardProp: (prop) =>
		prop !== 'error' && prop !== 'withLeftIcon' && prop !== 'inputPrefix' && prop !== 'as' && prop !== 'sx',
})<{error?: string; withLeftIcon?: boolean}>`
	height: 30px;
	width: 100%;
	border: none;
	outline: none;
	padding: 0 2px;
	&:focus {
		outline: none;
	}
	line-height: 16px;

	&:disabled {
		cursor: not-allowed;
	}
`;

const ErrorWrapper = styled('div', {
	shouldForwardProp: (prop) => prop !== 'isVisible',
})<{
	isVisible: boolean;
}>`
	opacity: ${(p) => (p.isVisible ? 1 : 0)};
	color: ${({theme}) => (theme as skyAllianceMUITheme).colors.error};
	font-size: 13px;
	line-height: 16px;
`;

const StyledInputWrapper = styled('div', {
	label: 'style-input-wrapper',
})<{}>`
	position: relative;
	height: 30px;
	line-height: 16px;
	font-weight: 500;
	width: 100%;
	/* margin-inline: 12px; */

	& > input {
		height: 30px;
		width: 100%;
		border: none;
		outline: none;
		padding: 0 2px;
		&:focus {
			outline: none;
		}
		line-height: 16px;
		border-radius: 6px;
	}
`;

export const detectAutofill = (element: HTMLInputElement) => {
	return new Promise((resolve) => {
		const timerId = setTimeout(() => {
			clearTimeout(timerId);
			resolve(window.getComputedStyle(element, null).getPropertyValue('appearance') === 'menulist-button');
		}, 600);
	});
};

type SelectMenuProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	leftIcon?: React.ReactNode;
	inputPrefix?: React.ReactNode;
	rightIcon?: React.ReactNode;
	rightIconSize?: number;
	rightLabel?: string;
	error?: string;
	errorDescription?: React.ReactNode;
	className?: string;
	inputAs?: React.ElementType;
	autoFocus?: boolean;
	disableTopLine?: boolean;
	_isFocusedManual?: boolean;
	isWithClearButton?: boolean;
	leftComponentsArray?: {component: React.ReactNode; key: string}[];
	helpMessage?: string;
	onAutoFill?: (name: string) => void;
	onChangeValue?: (newValue: string) => void;
	debounceMs?: number;
	sizeInput?: 'medium' | 'large' | undefined;
	isWithoutErrors?: boolean;
	sxRootContainer?: SxProps;
	sxWrapper?: SxProps;
	selectList?: {id: string; name: string}[];
	closeWhenSelect?: boolean;
	noIcon?: boolean;
	isRequired?: boolean;
	renderItem?: (i: string) => React.ReactNode;
};
const popoverAnchorOrigin: React.ComponentProps<typeof Popover>['anchorOrigin'] = {
	vertical: 'bottom',
	horizontal: 'right',
};

const transformOrigin: React.ComponentProps<typeof Popover>['transformOrigin'] = {
	vertical: 'top',
	horizontal: 'right',
};

export const SelectMenu = forwardRef<HTMLDivElement, SelectMenuProps>(
	(
		{
			// TODO add className props for input, for Root, for Wrapper
			label,
			placeholder,
			error,
			inputAs,
			_isFocusedManual,
			isWithClearButton,
			leftComponentsArray, // TODO right?
			helpMessage,
			onAutoFill,
			onChangeValue,
			debounceMs,
			sizeInput = 'large', // TODO change name of this prop (some conflict exists) // TODO fix label animation position for "medium"
			isWithoutErrors,
			sxRootContainer,
			sxWrapper,
			selectList,
			closeWhenSelect,
			noIcon,
			isRequired,
			renderItem,
			...props
		},
		refForInput,
	) => {
		const [value, setValue] = useState(String(props.value || '') || '');
		const [isFocused, setIsFocused] = useState(_isFocusedManual);
		const [isAutofilled, setIsAutofilled] = useState(false);

		// const clearInput = () => {
		// 	setValue('');
		// 	props.onChange?.({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
		// 	onChangeValue?.('');
		// };

		const inputRef = useRef<HTMLDivElement | null>(null);

		const {debouncedValue} = useDebounce(value, debounceMs || 0);

		useEffect(() => {
			onChangeValue?.(debouncedValue);
		}, [onChangeValue, debouncedValue]);

		useEffect(() => {
			if (refForInput) {
				if (typeof refForInput === 'function') {
					refForInput(inputRef.current);
				} else {
					inputRef.current = refForInput.current;
				}
			}
		}, [refForInput]);

		/*
		TODO найти почему предупреждение
		Blocked aria-hidden on an element because its descendant retained focus. The focus must not be hidden from assistive technology users. Avoid using aria-hidden on a focused element or its ancestor. Consider using the inert attribute instead, which will also prevent focus. For more details, see the aria-hidden section of the WAI-ARIA specification at https://w3c.github.io/aria/#aria-hidden.
Element with focus: div
Ancestor with aria-hidden:  
		
		*/
		const [isPopupOpen, setIsPopupOpen] = useState(false);

		const onSelectItem = useCallback(
			(e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
				const target = e.target as HTMLElement;

				const item = target.closest('[data-select-item-id]');
				const itemId = item?.getAttribute('data-select-item-id') as string; //(T[0]['key'];
				if (!itemId) return;
				const isChecked = item?.getAttribute('data-select-is-checked') === 'true' ? true : false;

				setValue(itemId);
				props.onChange?.({
					target: {
						name: props.name,
						value: itemId,
					},
				} as React.ChangeEvent<HTMLInputElement>);
				// onSelect([[{id: itemId, val: !isChecked}]]);
				// TODO SELECT
				console.log('itemId', itemId, isChecked);
				if (closeWhenSelect) {
					setIsPopupOpen(false);
				}
			},
			[setIsPopupOpen],
		);

		const closePopup = useCallback(() => {
			console.log('try to close');

			setIsPopupOpen(false);
			// onPopupClose?.();
		}, [
			setIsPopupOpen,
			// onPopupClose
		]);

		const [isSelectListExist, setIsSelectListExist] = useState(false);

		useEffect(() => {
			if (selectList?.length) {
				setIsSelectListExist(true);
			} else {
				setIsSelectListExist(false);
			}
		}, [selectList]);

		const RootRef = useRef<HTMLDivElement>(null);
		const anchorEl = RootRef.current;
		const isPopupOpenSafe = Boolean(anchorEl) && isPopupOpen;
		// console.log('isPopupOpenSafe', isPopupOpenSafe);
		// console.log(' Boolean(anchorEl), isPopupOpen;', Boolean(anchorEl), isPopupOpen);

		return (
			<RowsWrapper sx={sxWrapper}>
				{' '}
				{/* TODO объединить с Root input*/}
				<Root
					onClick={() => {
						console.log('try to open');

						setIsPopupOpen(true);
					}}
					ref={RootRef}
					sx={sxRootContainer}
					size={sizeInput}
					className={clsx({error: !!error, 'select-list': isSelectListExist, focus: isPopupOpenSafe})}
				>
					<div
						onClick={() => {
							if (isSelectListExist) return;
							inputRef?.current?.focus();
						}}
						style={{
							display: 'flex',
							alignItems: 'center',
							width: '100%',
							paddingBlock: '15px',
						}}
					>
						{!noIcon && (
							<div style={{display: 'flex', alignItems: 'center'}}>
								<Icon2 size={24} color="icon2" url={getIconUrlByName('search')} />
							</div>
						)}
						<StyledInputWrapper className="input-field">
							<FormFieldInput
								// as={isSelectListExist ? 'div' : 'input'}
								value={value}
								{...props}
								// placeholder=""
								// ref={ref}
								ref={inputRef}
								// sx={{
								// 	pointerEvents: isSelectListExist ? 'none' : undefined,
								// }}
								onFocus={(e) => {
									if (isSelectListExist) return;
									// TODO перенести на Root для того чтобы работало и тут и в inputField
									props?.onFocus?.(e);
									setIsFocused(true);
								}}
								onBlur={(e) => {
									if (isSelectListExist) return;
									props?.onBlur?.(e);
									console.log('try set is focused');

									setIsFocused(false);
								}}
								onChange={(e) => {
									if (isSelectListExist) return;
									setValue(e.target.value);
									props.onChange?.(e);
									setIsAutofilled(false);
								}}
							>
								{isSelectListExist && (
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'start',
											height: '100%',
										}}
									>
										{renderItem ? renderItem(value) : value}
									</div>
								)}
							</FormFieldInput>
							<label className={_isFocusedManual || isAutofilled || value ? 'onManualTop' : ''}>
								{label}
								{isRequired && <span>*</span>}
							</label>
							<Fade in={_isFocusedManual || (isFocused && !value)} unmountOnExit>
								<span className="placeholder">
									<span>{placeholder}</span>
								</span>
							</Fade>
						</StyledInputWrapper>
					</div>
					<div style={{display: 'flex', paddingBlock: '15px', alignItems: 'center'}}>
						{/* {isWithClearButton && (
							<div style={{display: 'flex', alignItems: 'center', opacity: value ? 1 : 0}}>
								<Icon2
									onClick={clearInput}
									sx={{cursor: value ? 'pointer' : 'default'}}
									size={24}
									color="icon2"
									url={getIconUrlByName('chest')}
								/>
							</div>
						)} */}
						{/* {helpMessage && (
							<div style={{display: 'flex', alignItems: 'center'}}>
								<SkyTooltipBase placement="top" title={helpMessage}>
									<div>
										<Icon2 size={24} color="icon2" url={getIconUrlByName('helpCircle')} />
									</div>
								</SkyTooltipBase>
							</div>
						)} */}
						<SkyTooltipIconHelper helpMessage={helpMessage} />
						{leftComponentsArray?.map(({component, key}) => (
							<div key={key} style={{display: 'flex', alignItems: 'center'}}>
								{component}
							</div>
						))}
						{isSelectListExist && <SkyChevron isUp={isPopupOpen} />}
					</div>
				</Root>
				{!isWithoutErrors && <ErrorWrapper isVisible={Boolean(error)}>{error || 'empty'}</ErrorWrapper>}
				{selectList?.length && (
					<SelectPopup
						noCheckbox
						closePopup={closePopup}
						anchorElRef={RootRef}
						onSelectItem={onSelectItem}
						isPopupOpenSafe={isPopupOpenSafe}
						// allList={selectList}
						filteredDataToShow={selectList}
						alreadySelected={{}}
						ParentComponentId={'select-menu'}
						popoverAnchorOrigin={popoverAnchorOrigin}
						transformOrigin={transformOrigin}
						// renderItem={renderItem}
					/>
				)}
			</RowsWrapper>
		);
	},
);
SelectMenu.displayName = 'SelectMenu';
export default SelectMenu;
