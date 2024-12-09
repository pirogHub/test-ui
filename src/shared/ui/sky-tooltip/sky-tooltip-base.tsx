import React from 'react';

import {skyAllianceMUITheme} from '@/styles/theme';
import {Popper, Tooltip, TooltipProps, styled, tooltipClasses} from '@mui/material';

const SkyTooltipBase = styled(({className, ...props}: TooltipProps) => (
	<Tooltip {...props} arrow classes={{popper: className}} />
))(({theme}) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: (theme as skyAllianceMUITheme).colors.base1,
		color: (theme as skyAllianceMUITheme).colors.text1,
		// boxShadow: theme.shadows[1], // shadows для Card
		boxShadow:
			'0px 0px 2px 0px rgba(0, 16, 61, 0.06), 0px 0px 6px 0px rgba(0, 0, 0, 0.06), 0px 6px 12px 0px rgba(0, 16, 61, 0.06)',

		borderRadius: '8px',
		fontSize: 11,
		padding: '8.5px 12px 9.5px 12px',
		display: 'flex',
		gap: '10px',
	},
	[`& .${tooltipClasses.arrow}`]: {
		color: (theme as skyAllianceMUITheme).colors.base1,

		'&::before': {
			boxShadow:
				'0px 0px 2px 0px rgba(0, 16, 61, 0.06), 0px 0px 6px 0px rgba(0, 0, 0, 0.06), 0px 6px 12px 0px rgba(0, 16, 61, 0.06)',
		},
	},
}));

export default SkyTooltipBase;
