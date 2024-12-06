import React from 'react';

import {skyAllianceMUITheme} from '@/styles/theme';
import {SkyAllianceBaseColorsNamesType} from '@/styles/theme/colors';
import styled from '@emotion/styled';

import {getIconUrlByName} from '@/shared/icons/icons-data';

import {Icon2} from '../icon';

type Props = {
	leftIcon?: React.ReactNode | false;
	color: SkyAllianceBaseColorsNamesType;
	backgroundColor: SkyAllianceBaseColorsNamesType;
	label?: string;
	rightComponent?: React.ReactNode;
};

const Root = styled('div', {
	shouldForwardProp: (propName) => propName !== 'color' && propName !== 'backgroundColor',
})<{
	color: SkyAllianceBaseColorsNamesType;
	backgroundColor: SkyAllianceBaseColorsNamesType;
}>`
	border-radius: 6px;
	padding: 2px 10px;
	display: inline-flex;
	gap: 6px;
	height: 24px;
	justify-content: center;
	align-items: center;
	line-height: 20px;
	font-weight: 600;
	font-size: 13px;
	/* color: ${(p) => p.color};
	background-color: ${(p) => p.backgroundColor}; */
	color: ${(p) => (p.theme as skyAllianceMUITheme).colors[p.color]};
	background-color: ${(p) => (p.theme as skyAllianceMUITheme).colors[p.backgroundColor]};

	& .SkyIcon {
		/* color: ${(p) => p.color};
		background-color: ${(p) => p.color}; */
		color: ${(p) => (p.theme as skyAllianceMUITheme).colors[p.color]};
		background-color: ${(p) => (p.theme as skyAllianceMUITheme).colors[p.color]};
	}
`;

const Text = styled('span')``;

export const Badge: React.FC<React.PropsWithChildren<Props>> = ({
	color,
	rightComponent,
	backgroundColor,
	label,
	leftIcon,
	children,
}) => {
	return (
		<div style={{display: 'inline'}}>
			<Root color={color} backgroundColor={backgroundColor}>
				{leftIcon ? (
					leftIcon
				) : leftIcon !== false ? (
					<Icon2 size={6} color={color} url={getIconUrlByName('pointerLi')} />
				) : null}
				<Text>{label || children}</Text>
				{rightComponent}
			</Root>
		</div>
	);
};
