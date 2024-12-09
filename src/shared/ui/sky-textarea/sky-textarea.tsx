import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';

import {Fade, TextareaAutosize, styled} from '@mui/material';

const RowsWrapper = styled('div', {
	label: 'SkyTextarea-rowsWrapper',
})<{}>`
	display: flex;
	flex-direction: column;
	gap: 4px;
	max-width: 100%;
	flex: 1;
`;

const Root = styled('div', {
	label: 'SkyTextarea-root',
})<{}>`
	border: 1px solid #eaeaea;
	border-radius: 12px;
	display: inline-flex;
	width: 100%;
	max-width: 100%;
	padding: 11px 11px 11px 16px;
	box-sizing: border-box;
	justify-content: space-between;
	outline: none;

	&:has(textarea:focus),
	&:has(label.onManualTop) {
		outline: 2px solid #2eacfb;
	}
	&.error,
	&.error:has(textarea:focus),
	&.error:has(label.onManualTop) {
		outline: 2px solid #eb5526;
	}
`;

export const TextArea = styled(TextareaAutosize, {
	label: 'SkyTextarea-textarea',
	shouldForwardProp: (prop) =>
		prop !== 'error' && prop !== 'withLeftIcon' && prop !== 'textareaPrefix' && prop !== 'as' && prop !== 'sx',
})<{error?: string; withLeftIcon?: boolean}>`
	min-height: 60px;
	height: 100%;
	width: 100%;
	max-width: 100%;
	border: none;
	outline: none;
	padding: 0 2px;
	min-width: 100px;
	flex: 1;
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
	color: #eb5526; // TODO
`;

const StyledTextAreaWrapper = styled('div', {
	label: 'SkyTextarea-StyledTextAreaWrapper',
})<{}>`
	position: relative;
	/* width: 100%; */
	line-height: 16px;
	font-weight: 500;
	max-width: 100%;
	flex: 1;

	& > textarea {
		width: 100%;
		height: auto;
		resize: both;
		/* border: none; */
		max-width: 100%;
		outline: none;
		padding: 0 2px;
		line-height: 16px;
	}

	& > .placeholder {
		position: absolute;
		top: 0;
		left: 4px;
		text-align: start;
		pointer-events: none;
		transition: 0.3s ease all;
		justify-content: start;
		align-items: start;
		font-size: 13px;
		color: #1b1f3b66; // TODO
		line-height: 16px;
	}
`;
export const SkyTextAreaField = forwardRef<
	HTMLTextAreaElement,
	React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
		label?: string;
		leftIcon?: React.ReactNode;
		textareaPrefix?: React.ReactNode;
		rightIcon?: React.ReactNode;
		rightIconSize?: number;
		rightLabel?: string;
		error?: string;
		errorDescription?: React.ReactNode;
		className?: string;
		textareaAs?: React.ElementType;
		autoFocus?: boolean;
		disableTopLine?: boolean;
	}
>((props, ref) => {
	const {label, placeholder, error, textareaAs, ...rest} = props;

	const [value, setValue] = useState('');
	const [isFocused, setIsFocused] = useState(false);

	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Expose the internal ref through the forwarded ref
	useImperativeHandle(ref, () => textareaRef.current!);

	return (
		<RowsWrapper>
			<Root className={error ? 'error' : ''}>
				<div
					onClick={() => textareaRef.current?.focus()}
					style={{
						display: 'flex',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<StyledTextAreaWrapper className="textarea-field">
						<TextArea
							ref={textareaRef}
							as={textareaAs}
							value={value}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							onChange={(e) => setValue(e.target.value)}
							{...rest}
						/>
						<Fade in={!value} unmountOnExit>
							<span className="placeholder">
								<span>{placeholder}</span>
							</span>
						</Fade>
					</StyledTextAreaWrapper>
				</div>
			</Root>
			{<ErrorWrapper isVisible={Boolean(error)}>{error || 'empty'}</ErrorWrapper>}
		</RowsWrapper>
	);
});

SkyTextAreaField.displayName = 'SkyTextAreaField';
