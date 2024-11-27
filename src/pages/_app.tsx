import React from 'react';

import '@/styles/globals.css';
import {ThemeProvider, createTheme} from '@mui/material';
import {yellow} from '@mui/material/colors';
import type {AppProps} from 'next/app';

// Расширение типов для Button
declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		secondary: true;
		outline: true;
		flatted: true;
	}
	interface ButtonPropsSizeOverrides {
		mylarge: true;
		mysmall: true;
	}

	interface ButtonOwnProps {
		// onlyIcon: true;
		isMyRounded?: true;
	}
}

// eslint-disable-next-line react/function-component-definition
export default function App({Component, pageProps: {...pageProps}}: AppProps) {
	const theme = createTheme({
		typography: {
			fontFamily: 'Gilroy, Arial, sans-serif',
		},
		components: {
			MuiButton: {
				defaultProps: {
					disableRipple: true,
					disableElevation: true,
					style: {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						textTransform: 'none',
						lineHeight: '20px',
						fontWeight: '600',
						gap: '8px',
					},
				},
				variants: [
					// { // TODO check why styles not applied
					//   props: { rounded: "rounded" },
					//   style: {
					//     borderRadius: "50%",
					//     backgroundColor: "black",
					//     color: "black",
					//   },
					// },
					{
						props: {variant: 'contained'}, // TODO declare

						style: {
							backgroundColor: 'rgba(46, 172, 251, 1)',
							color: 'white',

							'& .SkyIcon': {
								backgroundColor: 'white',
							},

							'&:hover, &.hover': {
								backgroundColor: ' rgba(88, 191, 255, 1)',
							},
							'&:active, &.active': {
								// backgroundColor: '#2EACFB',
							},
							'&:disabled, &.disabled': {
								backgroundColor: 'rgba(46, 172, 251, 1)',
								color: 'white',
								opacity: '0.4',
							},
						},
					},
					{
						props: {variant: 'secondary'}, // TODO declare
						style: {
							color: '#2EACFB',
							backgroundColor: '#F5F5F5',

							'& .SkyIcon': {
								backgroundColor: '#2EACFB',
							},

							'&:hover, &.hover': {
								backgroundColor: '#EAF7FF',
							},
							'&:active, &.active': {
								backgroundColor: '#F5F5F5',
							},
							'&:disabled, &.disabled': {
								backgroundColor: '#F5F5F5',
								color: '#2EACFB',
								opacity: '0.4',
							},
						},
					},
					{
						props: {variant: 'outline'}, // TODO declare
						style: {
							color: '#2EACFB',
							border: '1px solid #2EACFB66',
							backgroundColor: 'transparent',

							'& .SkyIcon': {
								backgroundColor: '#2EACFB',
							},

							'&:hover, &.hover': {
								border: '1px solid #2EACFB',
							},
							'&:active, &.active': {
								border: '1px solid #2EACFB66',
							},
							'&:disabled, &.disabled': {
								border: '1px solid #D8DAE0',
								color: '#D8DAE0',
								opacity: '0.4',
								'& .SkyIcon': {
									backgroundColor: '#D8DAE0',
								},
							},
						},
					},
					{
						props: {variant: 'flatted'}, // TODO declare
						style: {
							color: '#2EACFB',
							border: '1px solid transparent',
							backgroundColor: 'transparent',

							'& .SkyIcon': {
								backgroundColor: '#2EACFB',
							},

							'&:hover, &.hover': {
								backgroundColor: '#EAF7FF',
							},
							'&:active, &.active': {
								// border: '1px solid #2EACFB66',
							},
							'&:disabled, &.disabled': {
								// border: '1px solid #D8DAE0',
								color: '#2EACFB',
								opacity: '0.4',
							},
						},
					},
					{
						props: {size: 'mysmall'}, // TODO declare
						style: {
							height: '32px',
							borderRadius: '8px',
							minWidth: '40px',
							minHeight: '40px',
						},
					},
					{
						props: {size: 'mylarge'}, // TODO declare
						style: {
							padding: '0 36px',
							height: '56px',
							borderRadius: '12px',
							minWidth: '58px',
							minHeight: '56px',
						},
					},
				],
			},
		},
		palette: {
			secondary: {
				main: yellow[700],
				dark: yellow[900],
			},
			mode: 'light',
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
