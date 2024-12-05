import {forwardRef, useEffect, useRef, useState} from 'react';

import {skyAllianceMUITheme} from '@/styles/theme';
import {Fade, SxProps, styled} from '@mui/material';

import {useDebounce} from '@/shared/hooks/use-debounce';
import {getIconUrlByName} from '@/shared/icons/icons-data';

import {Icon2} from '../icon/icon';

const RowsWrapper = styled('div', {
	label: 'rows-wrapper',
})<{}>`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const Root = styled('div', {
	shouldForwardProp: (prop) => prop !== 'size',
	label: 'root',
})<{size?: string}>`
	border: 1px solid ${({theme}) => (theme as skyAllianceMUITheme).colors.base4};
	border-radius: 12px;
	display: inline-flex;

	height: ${(p) => (p.size === 'medium' ? '44px' : '56px')};
	box-sizing: border-box;
	padding-inline: 12px;
	justify-content: space-between;
	outline: none;
	width: 100%;

	&:has(input:focus) {
		outline: 2px solid ${({theme}) => (theme as skyAllianceMUITheme).colors.primary1};
	}
	&.error,
	&.error:has(input:focus) {
		outline: 2px solid ${({theme}) => (theme as skyAllianceMUITheme).colors.error};
	}
`;

export const FormFieldInput = styled('input', {
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

const StyledInputWrapper = styled('div')`
	position: relative;
	height: 30px;
	line-height: 16px;
	font-weight: 500;
	width: 100%;

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
	& > label {
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

	& > input:focus + label {
		position: absolute;
		left: 0;
		transform: translateY(-150%) translateX(-10%);
		/* width: 50px; */
		text-align: center;
		transition: 0.2s ease all;
		font-size: 13px;
	}
	& > label.onManualTop {
		position: absolute;
		left: 0;
		transform: translateY(-150%) translateX(-10%);
		/* width: 50px; */
		text-align: center;
		transition: 0.2s ease all;
		font-size: 13px;
	}

	& > .placeholder {
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

export const detectAutofill = (element: HTMLInputElement) => {
	return new Promise((resolve) => {
		const timerId = setTimeout(() => {
			clearTimeout(timerId);
			resolve(window.getComputedStyle(element, null).getPropertyValue('appearance') === 'menulist-button');
		}, 600);
	});
};

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
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
	size?: 'medium' | 'large' | undefined;
	isWithoutErrors?: boolean;
	sxRootContainer?: SxProps;
	sxWrapper?: SxProps;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{
			// TODO add className props for input, for Root, for Wrapper
			label,
			placeholder,
			error,
			inputAs,
			_isFocusedManual,
			isWithClearButton,
			leftComponentsArray,
			helpMessage,
			onAutoFill,
			onChangeValue,
			debounceMs,
			size = 'large', // TODO change name of this prop (some conflict exists) // TODO fix label animation position for "medium"
			isWithoutErrors,
			sxRootContainer,
			sxWrapper,
			...props
		},
		ref,
	) => {
		const [value, setValue] = useState(String(props.value || '') || '');
		const [isFocused, setIsFocused] = useState(_isFocusedManual);
		const [isAutofilled, setIsAutofilled] = useState(false);

		const clearInput = () => {
			setValue('');
			props.onChange?.({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
			onChangeValue?.('');
		};

		const inputRef = useRef<HTMLInputElement | null>(null);

		const {debouncedValue} = useDebounce(value, debounceMs || 0);

		useEffect(() => {
			onChangeValue?.(debouncedValue);
		}, [onChangeValue, debouncedValue]);

		useEffect(() => {
			if (ref) {
				if (typeof ref === 'function') {
					ref(inputRef.current);
				} else {
					inputRef.current = ref.current;
				}
			}
		}, [ref]);
		useEffect(() => {
			if (inputRef.current) {
				detectAutofill(inputRef.current)
					.then((isAutofilled) => {
						if (isAutofilled) {
							setIsAutofilled(true);
							if (props.name) onAutoFill?.(props.name);
						}
					})
					.catch(() => {});
			}
		}, [inputRef, onAutoFill]);
		return (
			<RowsWrapper sx={sxWrapper}>
				<Root sx={sxRootContainer} size={size} className={error ? 'error' : ''}>
					<div
						onClick={() => inputRef?.current?.focus()}
						style={{
							display: 'flex',
							alignItems: 'center',
							width: '100%',
							paddingBlock: '15px',
						}}
					>
						<div style={{display: 'flex', alignItems: 'center'}}>
							<Icon2 size={24} color="icon2" url={getIconUrlByName('search')} />
						</div>
						<StyledInputWrapper className="input-field">
							<FormFieldInput
								as={inputAs}
								value={value}
								{...props}
								// ref={ref}
								ref={inputRef}
								onFocus={(e) => {
									props?.onFocus?.(e);
									setIsFocused(true);
								}}
								onBlur={(e) => {
									props?.onBlur?.(e);

									setIsFocused(false);
								}}
								onChange={(e) => {
									setValue(e.target.value);
									props.onChange?.(e);
									setIsAutofilled(false);
								}}
							/>
							<label className={_isFocusedManual || isAutofilled || value ? 'onManualTop' : ''}>
								{label}
							</label>
							<Fade in={_isFocusedManual || (isFocused && !value)} unmountOnExit>
								<span className="placeholder">
									<span>{placeholder}</span>
								</span>
							</Fade>
						</StyledInputWrapper>
					</div>
					<div style={{display: 'flex', paddingBlock: '15px'}}>
						{isWithClearButton && (
							<div style={{display: 'flex', alignItems: 'center', opacity: value ? 1 : 0}}>
								<Icon2
									onClick={clearInput}
									sx={{cursor: value ? 'pointer' : 'default'}}
									size={24}
									color="icon2"
									url={getIconUrlByName('chest')}
								/>
							</div>
						)}
						{helpMessage && (
							<div style={{display: 'flex', alignItems: 'center'}}>
								<Icon2 size={24} color="icon2" url={getIconUrlByName('helpCircle')} />
							</div>
						)}
						{leftComponentsArray?.map(({component, key}) => (
							<div key={key} style={{display: 'flex', alignItems: 'center'}}>
								{component}
							</div>
						))}
					</div>
				</Root>
				{!isWithoutErrors && <ErrorWrapper isVisible={Boolean(error)}>{error || 'empty'}</ErrorWrapper>}
			</RowsWrapper>
		);
	},
);
InputField.displayName = 'InputField';
export default InputField;
