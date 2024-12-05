import React, {PropsWithChildren, createContext, useContext} from 'react';

import {useTableStore} from '@/state/use-table-hook';
import {useUserStore} from '@/state/use-user-hook';

const useCustomStore_ = () => {
	const userStore = useUserStore();
	const tableStore = useTableStore();

	return {userStore, tableStore};
};

type CustomStoreType = ReturnType<typeof useCustomStore_>;

const CustomStoreContext = createContext<CustomStoreType | undefined>(undefined);

export const useCustomStore = () => useContext(CustomStoreContext) as CustomStoreType;

export const CustomStoreProvider: React.FC<PropsWithChildren> = ({children}) => {
	const customStore = useCustomStore_();
	return (
		<CustomStoreContext.Provider value={customStore}>
			{/*  */}
			{children}
		</CustomStoreContext.Provider>
	);
};
