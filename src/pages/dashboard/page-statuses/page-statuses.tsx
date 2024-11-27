import React from 'react';

import {Header} from '@/components/header';

import {BadgeStatus} from '@/shared/ui/badge-status';

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
					<BadgeStatus status="analyze" />
					<BadgeStatus status="in-work" />
					<BadgeStatus status="done" />
					<BadgeStatus status="specified" />
					<BadgeStatus status="rejected" />
					<BadgeStatus status="waited" />
					<BadgeStatus status="draft" />
				</div>
			</div>
		</div>
	);
};

export default PageStatuses;
