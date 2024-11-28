import React from 'react';

import '@/styles/globals.css';
import type {AppProps} from 'next/app';

import {CustomThemeProvider} from '@/shared/providers/theme-provider';

// eslint-disable-next-line react/function-component-definition
export default function App({Component, pageProps: {...pageProps}}: AppProps) {
	return (
		// <ThemeProvider theme={theme}>
		<CustomThemeProvider>
			<Component {...pageProps} />
		</CustomThemeProvider>
		// </ThemeProvider>
	);
}
