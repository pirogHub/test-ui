import React from 'react';

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

// import {styled} from '@mui/material';

// import {xs} from '../../../components/common/common';
// import {ReTextColor, themedColor} from '../../../components/design/theme';

type Size = number | {x: number | string; y: number | string};

interface IconProps2 {
	size?: Size;
	url: string;
	round?: boolean;
	color?: string;
	colorActive?: string;
	// color?: ReTextColor;
	// colorActive?: ReTextColor;
	colorHex?: string;

	mobileProps?: Partial<Omit<IconProps, 'mobileProps'>>;
	isNotIcon?: boolean;
}

const getIconStyles = (p: IconProps2) => `
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
		// p.color !== undefined || p.colorHex !== undefined || p.colorActive !== undefined
		!p.isNotIcon
			? `
            mask-image: url('${p.url}');
            mask-repeat: no-repeat;
            mask-size: contain;
            mask-position: center;
            ${
				p.colorHex !== undefined
					? `background-color: ${p.colorHex}`
					: p.color !== undefined
						? // ? themedColor(p.color, 'background-color')
							`background-color: ${p.color}`
						: ''
			};
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
    ${(() => (p.colorActive !== undefined ? `${`background-color: ${p.color}`}` : ''))()}
`;

const Root = styled('div', {
	shouldForwardProp: (propName) =>
		propName !== 'size' &&
		propName !== 'url' &&
		propName !== 'sx' &&
		propName !== 'round' &&
		propName !== 'color' &&
		propName !== 'colorActive' &&
		propName !== 'mobileProps' &&
		propName !== 'colorHex',
})<IconProps2>`
	${(p) => getIconStyles(p)};
`;

export const Icon2: React.FC<React.ComponentProps<typeof Root>> = (props) => <Root className="SkyIcon" {...props} />;
