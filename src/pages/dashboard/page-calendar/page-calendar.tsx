import React from 'react';

import {Header} from '@/components/header';

import {Calendar} from '@/shared/ui/calendar';

export const PageCalendar = () => {
	return (
		<>
			<Header />

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '10px',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Calendar />
			</div>
		</>
	);
};

export default PageCalendar;
