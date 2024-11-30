import React from 'react';

import '@/styles/globals.css';
import type {AppProps} from 'next/app';

import {CustomThemeProvider} from '@/shared/providers/theme-provider';

const Layout = ({children}: {children: React.ReactNode}) => {
	// todo
	return (
		<div
			style={{
				padding: '24px 48px',
			}}
		>
			{children}
		</div>
	);
};

// eslint-disable-next-line react/function-component-definition
export default function App({Component, pageProps: {...pageProps}}: AppProps) {
	return (
		// <ThemeProvider theme={theme}>
		<CustomThemeProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</CustomThemeProvider>
		// </ThemeProvider>
	);
}
