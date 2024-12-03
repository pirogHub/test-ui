import React from 'react';

import Image from 'next/image';

import {getIconUrlByName} from '@/shared/icons/icons-data';

const Header = () => {
	return (
		<header style={{width: '100%'}}>
			<div
				style={{
					maxWidth: `${1344}px`,
					boxSizing: 'border-box',
					margin: '0 auto',
					minHeight: '40px',
					justifyContent: 'space-between',
					alignItems: 'center',
					display: 'flex',
				}}
			>
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
					<Image width="90" height="30" alt="Logo" src={getIconUrlByName('SkyLogo')} />
				</div>
			</div>
		</header>
	);
};

export default Header;
