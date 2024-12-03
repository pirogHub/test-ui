import React, {useMemo} from 'react';

import {skyAllianceMUITheme} from '@/styles/theme';
import {CSSObject, styled} from '@mui/material';

export type ButtonView = 'primary' | 'secondary' | 'outline' | 'flatted';

export type ButtonSize = 'm' | 'xl';

interface RootProps {
	view: ButtonView;
	size: ButtonSize;
	disableUnderline: boolean;
	styleOfDisable?: boolean;
}
const getButtonSize = (size: ButtonSize, isRounded?: boolean, isOnlyIcon?: boolean): CSSObject => {
	const sizeStylesXl = {
		height: '56px',
		borderRadius: isRounded ? '50%' : '12px',
		padding: isOnlyIcon || isRounded ? '0 16px' : '0 36px',
		lineHeight: '20px',
		fontWeight: '600',
		fontSize: '16px',
	};
	switch (size) {
		case 'm':
			return {
				height: '40px',
				borderRadius: isRounded ? '50%' : '10px',
				padding: isOnlyIcon || isRounded ? '0 10px' : '0 24px',
				lineHeight: '20px',
				fontWeight: '600',
				fontSize: '14px',
				gap: '8px',
			};
		case 'xl':
			return sizeStylesXl;

		default:
			return sizeStylesXl;
	}
};

const Root = styled('button', {
	shouldForwardProp: (propName) =>
		propName !== 'view' && propName !== 'active' && propName !== 'hover' && propName !== 'sx',
})<{
	isOnlyIcon?: boolean;
	view: ButtonView;
	size: ButtonSize;
	active?: boolean;
	hover?: boolean;
	isRounded?: boolean;
}>(({theme, view, isRounded, size, isOnlyIcon}) => {
	const map = (theme as skyAllianceMUITheme).skyAlliance.colors[view];

	const sizeStyles = getButtonSize(size, isRounded, isOnlyIcon);

	return {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textTransform: 'none',
		transition: 'all 0.4s ease',
		gap: '8px',
		cursor: 'pointer',
		border: 'none',

		...sizeStyles,
		...map.main,
		// backgroundColor: map.main.backgroundColor,

		'& .SkyIcon': {
			backgroundColor: map.main.iconColor,
		},

		'&:hover, &.hover': {
			...map.hover,
			backgroundColor: map.hover.backgroundColor,
		},
		'&:active, &.active': {
			...map.active,
			backgroundColor: map.active.backgroundColor,
		},
		'&:disabled, &.disabled': {
			cursor: 'default',
			...map.disabled,
			backgroundColor: map.disabled.backgroundColor,
			color: map.disabled.color,
			opacity: '0.4',
			'& .SkyIcon': {
				backgroundColor: map.disabled.iconColor,
			},
		},
	};
});

export interface ButtonProps extends Omit<React.ComponentProps<typeof Root>, Exclude<keyof RootProps, 'sx'>> {
	view?: ButtonView;
	size?: ButtonSize;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;

	active?: boolean;
	hover?: boolean;
	label?: string;
	leftComponent?: React.ReactNode;
	rightComponent?: React.ReactNode;
	isRounded?: boolean;
}

export const ButtonStyled = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(
	(
		{
			view = 'primary',
			size = 'm',
			label,
			active,
			hover,
			leftComponent,
			rightComponent,
			onClick,
			sx,

			children,
			className,

			...props
		},
		ref,
	) => {
		const finalClassName = useMemo(
			() =>
				[className, 'SkyAllianceButton', active ? 'active' : '', hover ? 'hover' : '']
					.filter(Boolean)
					.join(' '),
			[className, active, hover],
		);
		const isChildrenExist = label || children;
		return (
			<Root
				isOnlyIcon={!isChildrenExist}
				className={finalClassName}
				ref={ref}
				view={view}
				size={size}
				onClick={onClick}
				sx={sx}
				{...props}
			>
				{leftComponent ? leftComponent : null}
				{isChildrenExist ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '100%',
							height: '100%',
						}}
					>
						{label ? label : children}
					</div>
				) : null}
				{rightComponent ? rightComponent : null}
			</Root>
		);
	},
);
ButtonStyled.displayName = 'ButtonStyled';
