import React from 'react';

import {getIconUrlByName} from '@/shared/icons/icons-data';

import {Icon2} from '../icon';
import SkyTooltipBase from './sky-tooltip-base';

const SkyTooltipIconHelper = ({helpMessage, size = 24}: {size?: number; helpMessage?: string}) => {
	return helpMessage ? (
		<div style={{cursor: 'help', display: 'flex', alignItems: 'center'}}>
			<SkyTooltipBase placement="top" title={helpMessage}>
				<div>
					<Icon2 size={size} color="icon2" url={getIconUrlByName('helpCircle')} />
				</div>
			</SkyTooltipBase>
		</div>
	) : null;
};

export default SkyTooltipIconHelper;
