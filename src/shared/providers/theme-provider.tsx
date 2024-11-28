import React, {PropsWithChildren, createContext, useContext, useEffect, useMemo, useState} from 'react';

import {skyAllianceDarkTheme, skyAllianceLightTheme} from '@/styles/theme';
// import {darkTheme, lightTheme} from '@/styles/theme';
import {CssBaseline} from '@mui/material';
import {ThemeProvider} from '@mui/material/styles';

const ThemeToggleContext = createContext({isDarkMode: false, toggleTheme: () => {}});

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const CustomThemeProvider: React.FC<PropsWithChildren> = ({children}) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = () => setIsDarkMode((prev) => !prev);

	const currentTheme = useMemo(() => (isDarkMode ? skyAllianceDarkTheme : skyAllianceLightTheme), [isDarkMode]);

	useEffect(() => {
		document.body.className = isDarkMode ? 'dark' : 'light';
	}, [isDarkMode]);

	return (
		<ThemeToggleContext.Provider value={{isDarkMode, toggleTheme}}>
			<ThemeProvider theme={currentTheme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeToggleContext.Provider>
	);
};
