import React from 'react';

import {Button as MuiButton} from '@mui/material';

type ButtonProps = React.ComponentProps<typeof MuiButton> & {
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

	return {padding: onlyIconStylesMap['mylarge'].padding};
};

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
	label,
	children,
	leftComponent,
	rightComponent,
	...props
}) => {
	const isChildrenExist = label || children;

	const sx = {
		...(!isChildrenExist ? getOnlyIconStyles(props.size) : {}),
	};

	return (
		<MuiButton {...props} sx={sx}>
			{leftComponent ? leftComponent : null}
			{isChildrenExist ? (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
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

export default Button;
