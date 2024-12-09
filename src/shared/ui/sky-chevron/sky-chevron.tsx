import React from 'react';

import {getIconUrlByName} from '@/shared/icons/icons-data';

import {Icon2} from '../icon';

const SkyChevron = ({isUp}: {isUp?: boolean}) => {
	return (
		<Icon2
			color="icon2"
			size={24}
			sx={{
				transition: 'all 0.3s ease',
				...(isUp ? {transform: 'rotate(180deg)'} : {}),
			}}
			url={getIconUrlByName('chevronDown')}
		/>
	);
};

export default SkyChevron;
