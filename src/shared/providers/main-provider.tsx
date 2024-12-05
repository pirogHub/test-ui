import React, {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';

import {store} from '@/state/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {CustomStoreProvider} from './store-provider';
import {CustomThemeProvider} from './theme-provider';

const queryClient = new QueryClient();
const MainProvider: React.FC<PropsWithChildren> = ({children}) => {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<CustomStoreProvider>
					<CustomThemeProvider>
						{/*  */}
						{children}
					</CustomThemeProvider>
				</CustomStoreProvider>
			</QueryClientProvider>
		</Provider>
	);
};

export default MainProvider;
