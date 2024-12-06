import {Theme, createTheme} from '@mui/material';
import '@mui/material/styles';

import {SkyAllianceBaseColors, SkyAllianceBaseColorsSchemaType, getThemedColor as gtc} from './theme/colors';

// const _skyAllianceBaseColorsLight = {
// 	colors: {
// 		// Text & Icons
// 		text1: 'rgba(35, 31, 35, 1)',
// 		text2: 'rgba(27, 31, 59, 0.8)', // color for text in filter
// 		text3: 'rgba(27, 31, 59, 0.65)', // secondary color for text
// 		text4: 'rgba(27, 31, 59, 0.4)',
// 		icon1: 'rgba(71, 72, 79, 1)',
// 		icon2: 'rgba(164, 165, 177, 1)',
// 		// Base
// 		base1: 'rgba(255, 255, 255, 1)', // modals
// 		base2: 'rgba(249, 250, 252, 1)', // main page color
// 		base3: 'rgba(216, 218, 224, 1)', // secondary color
// 		base4: 'rgba(234, 234, 234, 1)', // border color
// 		base5: 'rgba(248, 248, 248, 1)', // row hover
// 		base6: 'rgba(236, 239, 244, 1)',
// 		primary1: gtc('primary1'),
// 		primary04Active: 'rgba(46, 172, 251, 0.4)',
// 		backgroundAccent: 'rgba(234, 247, 255, 1)', // buttons color
// 		backgroundAccent2Hover: 'rgba(88, 191, 255, 1)', // buttons hover color
// 		// System
// 		error: 'rgba(235, 85, 38, 1)',
// 		positive: 'rgba(76, 199, 89, 1)',
// 		// Status
// 		StatusBg1: 'rgba(235, 241, 253, 1)',
// 		StatusBg2: 'rgba(0, 16, 61, 0.12)',
// 		StatusBg3: 'rgba(218, 244, 203, 1)',
// 		StatusBg4: 'rgba(255, 249, 222, 1)',
// 		StatusBg5: 'rgba(255, 232, 228, 1)',
// 		StatusBg6: 'rgba(255, 239, 215, 1)',
// 		StatusBg7: 'rgba(245, 245, 245, 1)',
// 		StatusText1: 'rgba(32, 98, 241, 1)',
// 		StatusText2: 'rgba(125, 34, 206, 1)',
// 		StatusText3: 'rgba(65, 122, 71, 1)',
// 		StatusText4: 'rgba(242, 178, 0, 1)',
// 		StatusText5: '',
// 		StatusText6: 'rgba(243, 155, 14, 1)',
// 		StatusText7: 'rgba(117, 117, 117, 1)',
// 	},
// };

// type SkyAllianceBaseColorsSchemaType = keyof typeof _skyAllianceBaseColorsLight['colors'];

// export const gtc = (colorName: SkyAllianceBaseColorsSchemaType,): string => iconsUrlData[iconName];

export const _skyAllianceLightTheme = {
	colors: {
		primary: {
			main: {
				color: 'white',
				backgroundColor: gtc('primary1'),
				iconColor: 'white',
			},
			hover: {
				color: 'white',
				backgroundColor: gtc('backgroundAccent2Hover'),
				iconColor: 'white',
			},
			active: {
				color: 'white',
				backgroundColor: gtc('primary1'),
				iconColor: 'white',
			},
			disabled: {
				backgroundColor: gtc('primary1'),
				color: 'white',
				iconColor: 'white',
			},
		},
		secondary: {
			main: {
				color: gtc('primary1'),
				backgroundColor: gtc('base7'),
				iconColor: gtc('primary1'),
			},
			hover: {
				color: gtc('primary1'),
				backgroundColor: 'rgb(235, 247, 255)',
				iconColor: gtc('primary1'),
			},
			active: {
				color: gtc('primary1'),
				backgroundColor: gtc('base7'),
				iconColor: gtc('primary1'),
			},
			disabled: {
				backgroundColor: gtc('base7'),
				color: gtc('primary1'),
				iconColor: gtc('primary1'),
			},
		},
		outline: {
			main: {
				color: gtc('primary1'),
				backgroundColor: 'transparent',
				border: `1px solid ${gtc('primary04Active')}`,
				iconColor: gtc('primary1'),
			},
			hover: {
				color: gtc('primary1'),
				backgroundColor: 'transparent',
				iconColor: gtc('primary1'),
				border: `1px solid ${gtc('primary1')}`,
			},
			active: {
				border: `1px solid ${gtc('primary04Active')}`,
				color: gtc('primary1'),
				backgroundColor: 'transparent',
				iconColor: gtc('primary1'),
			},
			disabled: {
				border: `1px solid ${gtc('base3')}`,
				backgroundColor: 'transparent',
				color: gtc('primary1'),
				iconColor: gtc('primary1'),
			},
		},
		flatted: {
			main: {
				color: gtc('primary1'),
				backgroundColor: 'transparent',
				border: '1px solid transparent',
				iconColor: gtc('primary1'),
			},
			hover: {
				color: gtc('primary1'),
				backgroundColor: gtc('backgroundAccent'),
				iconColor: gtc('primary1'),
			},
			active: {
				color: gtc('primary1'),
				backgroundColor: 'transparent',
				iconColor: gtc('primary1'),
			},
			disabled: {
				color: gtc('primary1'),
				backgroundColor: 'transparent',
				border: '1px solid transparent',
				iconColor: gtc('primary1'),
			},
		},
	},
};

export type skyAllianceThemeType = typeof _skyAllianceLightTheme;

export const _skyAllianceDarkTheme: skyAllianceThemeType = _skyAllianceLightTheme;
// export const _skyAllianceDarkTheme: skyAllianceThemeType = {
// 	colors: {
// 		primary: {
// 			main: {
// 				color: 'white',
// 				backgroundColor: 'rgba(46, 172, 251, 0.9)',
// 				iconColor: 'white',
// 			},
// 			hover: {
// 				color: 'white',
// 				backgroundColor: gtc('primary1'),
// 				iconColor: 'white',
// 			},
// 			active: {
// 				color: 'white',
// 				backgroundColor: 'rgba(46, 172, 251, 0.8)',
// 				iconColor: 'white',
// 			},
// 			disabled: {
// 				backgroundColor: 'rgba(46, 172, 251, 0.5)',
// 				color: 'rgb(215, 217, 223)',
// 				iconColor: 'hsl(225, 11%, 86%)',
// 			},
// 		},
// 		secondary: {
// 			main: {
// 				color: gtc('primary1'),
// 				backgroundColor: 'hsl(0, 0%, 12%)',
// 				iconColor: gtc('primary1'),
// 			},
// 			hover: {
// 				color: gtc('primary1'),
// 				backgroundColor: 'hsl(0, 0%, 17%)',
// 				iconColor: gtc('primary1'),
// 			},
// 			active: {
// 				color: 'rgba(46, 172, 251, 0.9)',
// 				backgroundColor: 'hsl(0, 0%, 12%)',
// 				iconColor: gtc('primary1'),
// 			},
// 			disabled: {
// 				backgroundColor: 'hsl(0, 0%, 12%)',
// 				color: '#555555',
// 				iconColor: '#555555',
// 			},
// 		},
// 		outline: {
// 			main: {
// 				color: gtc('primary1'),
// 				backgroundColor: 'transparent',
// 				border: '1px solid rgba(46, 172, 251, 0.4)',
// 				iconColor: gtc('primary1'),
// 			},
// 			hover: {
// 				color: gtc('primary1'),
// 				backgroundColor: 'transparent',
// 				iconColor: gtc('primary1'),
// 				border: '1px solid rgba(46, 172, 251, 1)',
// 			},
// 			active: {
// 				border: '1px solid rgba(46, 172, 251, 0.7)',
// 				color: gtc('primary1'),
// 				backgroundColor: 'transparent',
// 				iconColor: gtc('primary1'),
// 			},
// 			disabled: {
// 				border: '1px solid #555555',
// 				backgroundColor: 'transparent',
// 				color: '#555555',
// 				iconColor: '#555555',
// 			},
// 		},
// 		flatted: {
// 			main: {
// 				color: gtc('primary1'),
// 				backgroundColor: 'transparent',
// 				border: '1px solid transparent',
// 				iconColor: gtc('primary1'),
// 			},
// 			hover: {
// 				color: gtc('primary1'),
// 				backgroundColor: '#2B2B2B',
// 				iconColor: gtc('primary1'),
// 			},
// 			active: {
// 				color: gtc('primary1'),
// 				backgroundColor: 'transparent',
// 				iconColor: gtc('primary1'),
// 			},
// 			disabled: {
// 				color: '#555555',
// 				backgroundColor: 'transparent',
// 				border: '1px solid transparent',
// 				iconColor: '#555555',
// 			},
// 		},
// 	},
// };

export type skyAllianceMUITheme = Theme & {
	// skyAllianceThemeType &
	theme: 'light' | 'dark';
	skyAlliance: skyAllianceThemeType;
	colors: SkyAllianceBaseColorsSchemaType;
};

const breakpoints = {
	values: {
		xs: 0,
		sm: 600,
		md: 960,
		lg: 1280,
		xl: 1920,
	},
};

export const skyAllianceLightTheme: skyAllianceMUITheme = {
	...createTheme({
		// palette : {...} TODO
		// typography: {...} TODO
		components: {
			MuiPaper: {
				styleOverrides: {
					root: {
						borderRadius: '10px',
					},
				},
			},
		},
		breakpoints,
	}),

	theme: 'light',
	skyAlliance: _skyAllianceLightTheme,
	colors: SkyAllianceBaseColors['light'],
};
export const skyAllianceDarkTheme: skyAllianceMUITheme = {
	...createTheme({
		components: {
			MuiPaper: {
				styleOverrides: {
					root: {
						borderRadius: '10px',
					},
				},
			},
		},
		breakpoints,
	}),
	// ..._skyAllianceDarkTheme,
	theme: 'dark',
	skyAlliance: _skyAllianceDarkTheme,
	colors: SkyAllianceBaseColors['dark'],
};
