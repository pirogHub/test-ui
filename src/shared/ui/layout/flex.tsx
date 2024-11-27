import React from 'react';

import {styled} from '@mui/material';

const FlexRoot = styled('div', {
	shouldForwardProp: (propName) =>
		propName !== 'column' &&
		propName !== 'center' &&
		propName !== 'gap' &&
		propName !== 'sx' &&
		propName !== 'justifyContent' &&
		propName !== 'alignItems' &&
		propName !== 'as',
})<{
	column?: boolean;
	center?: boolean;
	justifyContent?: React.CSSProperties['justifyContent'];
	alignItems?: React.CSSProperties['alignItems'];
	gap?: number;
}>`
	display: flex;
	${(p) => p.column && 'flex-direction: column'};
	${(p) => p.center && `justify-content: center; align-items: center;`};
	${(p) => p.justifyContent !== undefined && `justify-content: ${p.justifyContent};`};
	${(p) => p.alignItems !== undefined && `align-items: ${p.alignItems};`};
	${(p) => p.gap !== undefined && `gap: ${p.gap}px`};
`;

interface FlexProps extends React.ComponentProps<typeof FlexRoot> {
	sxMobile?: React.ComponentProps<typeof FlexRoot>['sx'];
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(({...props}, ref) => {
	return (
		<FlexRoot
			{...props}
			ref={ref}
			sx={{
				...props.sx,
			}}
		/>
	);
});
Flex.displayName = 'Flex';

export const FlexRow = styled('div')({
	// TODO toremove
	display: 'flex',
	flexDirection: 'row',
	gap: 10,
	justifyContent: 'space-between',
	'& > div': {
		display: 'flex',
		with: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
});
