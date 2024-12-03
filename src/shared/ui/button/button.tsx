import React from 'react';

import {Button as MuiButton} from '@mui/material';

export type ButtonProps = React.ComponentProps<typeof MuiButton> & {
	isActive?: boolean;
	label?: string;
	leftComponent?: React.ReactNode;
	rightComponent?: React.ReactNode;
};

const onlyIconStylesMap = {
	mylarge: {
		padding: '0 16px',
	},
	mysmall: {
		padding: '0 10px',
	},
} as const;
type OnlyIconSize = keyof typeof onlyIconStylesMap;
const getOnlyIconStyles = (size: React.ComponentProps<typeof MuiButton>['size']) => {
	if (size && size in onlyIconStylesMap) {
		const key = size as OnlyIconSize;
		return {padding: onlyIconStylesMap[key].padding};
	}

	// Возвращаем значение по умолчанию
	return {padding: onlyIconStylesMap['mylarge'].padding};
};

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
	isActive,
	label,
	children,
	leftComponent,
	rightComponent,
	// isRounded,
	...props
}) => {
	const isChildrenExist = label || children;
	const sx = {
		...props.sx,
		...(!isChildrenExist ? getOnlyIconStyles(props.size) : {}),
		// ...(isRounded ? {borderRadius: '50%'} : {}),
	};
	return (
		<MuiButton {...props} sx={sx} className={isActive ? 'active' : ''}>
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
		</MuiButton>
	);
};
