import React, {useEffect} from 'react';

import Image from 'next/image';

import {getIconUrlByName} from '@/shared/icons/icons-data';
import {useCustomStore} from '@/shared/providers/store-provider';

export const SkyHeader = () => {
	const {userStore} = useCustomStore();

	const {user, refetch, logout} = userStore;

	useEffect(() => {
		console.log('user', user);
	}, [user]);
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
				{user ? (
					<div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
						<Image
							style={{backgroundColor: '#555', borderRadius: '50%'}}
							width="40"
							height="40"
							alt="icon"
							src={user.avatar}
						/>{' '}
						<span>
							{user.name} <button onClick={logout}>logout</button>
						</span>
					</div>
				) : null}
			</div>
		</header>
	);
};
