import React from 'react';

import {Header} from '@/components/header';

import {StatusBudge} from '@/shared/ui/status-Budge';

const PageStatuses = () => {
	return (
		<div>
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
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '10px',
						justifyContent: 'start',
						alignItems: 'start',
					}}
				>
					<StatusBudge status="analyze" />
					<StatusBudge status="in-work" />
					<StatusBudge status="done" />
					<StatusBudge status="specified" />
					<StatusBudge status="rejected" />
					<StatusBudge status="waited" />
					<StatusBudge status="draft" />
				</div>
			</div>
		</div>
	);
};

export default PageStatuses;
