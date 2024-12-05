import React, {PropsWithChildren, createContext, useContext} from 'react';

import {useUserStore} from '@/state/use-user-hook';

const useCustomStore_ = () => {
	const userStore = useUserStore();

	return {userStore};
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
