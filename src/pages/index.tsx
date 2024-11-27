import React from 'react';

import {Header} from '@/components/header';

// import Login from '@/components/login';
// import SideMenu from '@/components/side-menu';
// import {ThemeProvider, createTheme} from '@mui/material';
// import {yellow} from '@mui/material/colors';
// import localFont from 'next/font/local';
import Dashboard from './dashboard';

// const geistSans = localFont({
// 	src: './fonts/GeistVF.woff',
// 	variable: '--font-geist-sans',
// 	weight: '100 900',
// });
// const geistMono = localFont({
// 	src: './fonts/GeistMonoVF.woff',
// 	variable: '--font-geist-mono',
// 	weight: '100 900',
// });

export const Home = () => {
	return (
		<>
			{/* <div
				className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
				> */}
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				uikit
				<Header />
				{/* <SideMenu /> */}
				<Dashboard />
				{/* <Login /> */}
			</main>
			{/* </div> */}
			{/* </ThemeProvider> */}
		</>
	);
};

export default Home;
