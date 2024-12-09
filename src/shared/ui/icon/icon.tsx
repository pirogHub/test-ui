import React from 'react';

import {skyAllianceMUITheme} from '@/styles/theme';
import {SkyAllianceBaseColorsNamesType} from '@/styles/theme/colors';
import {styled} from '@mui/material';

interface IconProps {
	size?: number; // Кастомное свойство
}
const Icon = styled('img')<IconProps>(({theme, size = 24}) => ({
	width: size,
	height: size,
	filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none', // Пример стилизации
}));

export default Icon;

type Size = number | {x: number | string; y: number | string};

interface IconProps2 {
	size?: Size;
	url: string;
	round?: boolean;
	color?: SkyAllianceBaseColorsNamesType;
	colorActive?: SkyAllianceBaseColorsNamesType;

	colorManual?: string;
	colorManualActive?: string;

	mobileProps?: Partial<Omit<IconProps, 'mobileProps'>>;
	isNotIcon?: boolean;
}

const getIconStyles = (p: IconProps2, theme: skyAllianceMUITheme) => {
	const color = p.color ? theme.colors[p.color] : p.colorManual;
	const colorActive = p.colorActive ? theme.colors[p.colorActive] : p.colorManualActive;

	return `
    transition: all 0s;
    ${(() => {
		if (!p.size) return '';
		const value =
			typeof p.size === 'number' ? `${p.size}px` : typeof p.size.x === 'number' ? `${p.size.x}px` : p.size.x;
		return `
      width: ${value};
      min-width: ${value};
      max-width: ${value};
    `;
	})()};
    ${(() => {
		if (!p.size) return '';
		const value =
			typeof p.size === 'number' ? `${p.size}px` : typeof p.size.y === 'number' ? `${p.size.y}px` : p.size.y;
		return `
      height: ${value};
      min-height: ${value};
      max-height: ${value};
    `;
	})()};
    ${(() =>
		!p.isNotIcon
			? `
            mask-image: url('${p.url}');
            mask-repeat: no-repeat;
            mask-size: contain;
            mask-position: center;
            ${color !== undefined ? `background-color: ${color}` : ''};
            ${p.round && 'mask-size: cover;'};
    `
			: `
            background-image: url('${p.url}');
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            ${p.round && 'background-size: cover;'};
    `)()};
    ${(() => p.round && `border-radius: 50%;`)()};
    ${(() => (colorActive !== undefined ? `${`background-color: ${colorActive}`}` : ''))()}
`;
};

const Root = styled('div', {
	label: 'SkyIcon',
	shouldForwardProp: (propName) =>
		propName !== 'size' &&
		propName !== 'url' &&
		propName !== 'sx' &&
		propName !== 'round' &&
		propName !== 'color' &&
		propName !== 'colorActive' &&
		propName !== 'mobileProps' &&
		propName !== 'colorManual' &&
		propName !== 'colorManualActive' &&
		propName !== 'isNotIcon',
})<IconProps2>`
	${(p) => getIconStyles(p, p.theme as skyAllianceMUITheme)};
`;

export const Icon2: React.FC<React.ComponentProps<typeof Root>> = (props) => <Root className="SkyIcon" {...props} />;
