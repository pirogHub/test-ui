// const skyAllianceTheme = {
// 	primary: {
// 		main: {
// 			color: 'black',
// 			backgroundColor: 'black',
// 			iconColor: 'black',
// 		},
// 		hover: {
// 			color: 'black',
// 			backgroundColor: 'black',
// 		},
// 		active: {
// 			color: 'black',
// 			backgroundColor: 'black',
// 		},
// 		disabled: {
// 			color: 'black',
// 			backgroundColor: 'black',
// 			iconColor: 'black',
// 		},
// 	},
// 	secondary: {
// 		main: {
// 			color: 'black',
// 			backgroundColor: 'black',
// 			iconColor: 'black',
// 		},
// 		hover: {
// 			color: 'black',
// 			backgroundColor: 'black',
// 		},
// 		active: {
// 			color: 'black',
// 			backgroundColor: 'black',
// 		},
// 		disabled: {
// 			color: 'black',
// 			backgroundColor: 'black',
// 			iconColor: 'black',
// 		},
// 	},
// };
import React from 'react';

import {Theme, createTheme} from '@mui/material';
import '@mui/material/styles';

export const _skyAllianceLightTheme = {
	colors: {
		primary: {
			main: {
				color: 'white',
				backgroundColor: 'rgba(46, 172, 251, 1)',
				iconColor: 'white',
			},
			hover: {
				color: 'white',
				backgroundColor: 'rgba(88, 191, 255, 1)',
				iconColor: 'white',
			},
			active: {
				color: 'white',
				backgroundColor: 'rgba(46, 172, 251, 1)',
				iconColor: 'white',
			},
			disabled: {
				backgroundColor: 'rgba(46, 172, 251, 1)',
				color: 'white',
				iconColor: 'white',
			},
		},
		secondary: {
			main: {
				color: '#2EACFB',
				backgroundColor: '#F5F5F5',
				iconColor: '#2EACFB',
			},
			hover: {
				color: 'rgba(46, 172, 251, 1)',
				backgroundColor: '#EAF7FF',
				iconColor: '#2EACFB',
			},
			active: {
				color: 'rgba(46, 172, 251, 1)',
				backgroundColor: '#F5F5F5',
				iconColor: '#2EACFB',
			},
			disabled: {
				backgroundColor: '#F5F5F5',
				color: '#2EACFB',
				iconColor: '#2EACFB',
			},
		},
		outline: {
			main: {
				color: '#2EACFB',
				backgroundColor: 'transparent',
				border: '1px solid #2EACFB66',
				iconColor: '#2EACFB',
			},
			hover: {
				color: 'rgba(46, 172, 251, 1)',
				backgroundColor: 'transparent',
				iconColor: '#2EACFB',
				border: '1px solid #2EACFB',
			},
			active: {
				border: '1px solid #2EACFB66',
				color: 'rgba(46, 172, 251, 1)',
				backgroundColor: 'transparent',
				iconColor: '#2EACFB',
			},
			disabled: {
				border: '1px solid #D8DAE0',
				backgroundColor: 'transparent',
				color: '#2EACFB',
				iconColor: '#2EACFB',
			},
		},
		flatted: {
			main: {
				color: '#2EACFB',
				backgroundColor: 'transparent',
				border: '1px solid transparent',
				iconColor: '#2EACFB',
			},
			hover: {
				color: '#2EACFB',
				backgroundColor: '#EAF7FF',
				iconColor: '#2EACFB',
			},
			active: {
				color: '#2EACFB',
				backgroundColor: 'transparent',
				iconColor: '#2EACFB',
			},
			disabled: {
				color: '#2EACFB',
				backgroundColor: 'transparent',
				border: '1px solid transparent',
				iconColor: '#2EACFB',
			},
		},
	},
};

export type skyAllianceThemeType = typeof _skyAllianceLightTheme;

export const _skyAllianceDarkTheme: skyAllianceThemeType = {
	colors: {
		primary: {
			main: {
				color: 'white',
				backgroundColor: 'rgba(46, 172, 251, 0.9)',
				iconColor: 'white',
			},
			hover: {
				color: 'white',
				backgroundColor: 'rgba(46, 172, 251, 1)',
				iconColor: 'white',
			},
			active: {
				color: 'white',
				backgroundColor: 'rgba(46, 172, 251, 0.8)',
				iconColor: 'white',
			},
			disabled: {
				backgroundColor: 'rgba(46, 172, 251, 0.5)',
				color: '#D8DAE0',
				iconColor: '#D8DAE0',
			},
		},
		secondary: {
			main: {
				color: '#2EACFB',
				backgroundColor: '#1E1E1E',
				iconColor: '#2EACFB',
			},
			hover: {
				color: 'rgba(46, 172, 251, 1)',
				backgroundColor: '#2B2B2B',
				iconColor: '#2EACFB',
			},
			active: {
				color: 'rgba(46, 172, 251, 0.9)',
				backgroundColor: '#1E1E1E',
				iconColor: '#2EACFB',
			},
			disabled: {
				backgroundColor: '#1E1E1E',
				color: '#555555',
				iconColor: '#555555',
			},
		},
		outline: {
			main: {
				color: '#2EACFB',
				backgroundColor: 'transparent',
				border: '1px solid rgba(46, 172, 251, 0.4)',
				iconColor: '#2EACFB',
			},
			hover: {
				color: 'rgba(46, 172, 251, 1)',
				backgroundColor: 'transparent',
				iconColor: '#2EACFB',
				border: '1px solid rgba(46, 172, 251, 1)',
			},
			active: {
				border: '1px solid rgba(46, 172, 251, 0.7)',
				color: 'rgba(46, 172, 251, 1)',
				backgroundColor: 'transparent',
				iconColor: '#2EACFB',
			},
			disabled: {
				border: '1px solid #555555',
				backgroundColor: 'transparent',
				color: '#555555',
				iconColor: '#555555',
			},
		},
		flatted: {
			main: {
				color: '#2EACFB',
				backgroundColor: 'transparent',
				border: '1px solid transparent',
				iconColor: '#2EACFB',
			},
			hover: {
				color: '#2EACFB',
				backgroundColor: '#2B2B2B',
				iconColor: '#2EACFB',
			},
			active: {
				color: '#2EACFB',
				backgroundColor: 'transparent',
				iconColor: '#2EACFB',
			},
			disabled: {
				color: '#555555',
				backgroundColor: 'transparent',
				border: '1px solid transparent',
				iconColor: '#555555',
			},
		},
	},
};

export type skyAllianceMUITheme = Theme &
	skyAllianceThemeType & {
		skyAlliance: skyAllianceThemeType;
	};

export const skyAllianceLightTheme: skyAllianceMUITheme = {
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
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 960,
				lg: 1280,
				xl: 1920,
			},
		},
	}),
	..._skyAllianceLightTheme,
	skyAlliance: _skyAllianceLightTheme,
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
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 960,
				lg: 1280,
				xl: 1920,
			},
		},
	}),
	..._skyAllianceDarkTheme,
	skyAlliance: _skyAllianceDarkTheme,
};
