import React, {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';

import {persistor, store} from '@/state/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PersistGate} from 'redux-persist/integration/react';

import {CustomStoreProvider} from './store-provider';
import {CustomThemeProvider} from './theme-provider';

const queryClient = new QueryClient();
const MainProvider: React.FC<PropsWithChildren> = ({children}) => {
	return (
		<Provider store={store}>
			<PersistGate loading={<div>Loading...</div>} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<CustomStoreProvider>
						<CustomThemeProvider>
							{/*  */}
							{children}
						</CustomThemeProvider>
					</CustomStoreProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
};

export default MainProvider;
