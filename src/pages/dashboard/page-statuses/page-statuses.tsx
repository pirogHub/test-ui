import React from 'react';

import {Header} from '@/components/header';

import {StatusBadge} from '@/shared/ui/status-badge';

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
					<StatusBadge status="analyze" />
					<StatusBadge status="in-work" />
					<StatusBadge status="done" />
					<StatusBadge status="specified" />
					<StatusBadge status="rejected" />
					<StatusBadge status="waited" />
					<StatusBadge status="draft" />
				</div>
			</div>
		</div>
	);
};

export default PageStatuses;
