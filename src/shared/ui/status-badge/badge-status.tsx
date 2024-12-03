import React from 'react';

import {SkyAllianceBaseColorsNamesType} from '@/styles/theme/colors';

import {Badge} from '../badge';

export const StatusTypesVals = ['analyze', 'in-work', 'done', 'specified', 'rejected', 'waited', 'draft'] as const;
// export type StatusTypes = 'analyze' | 'in-work' | 'done' | 'specified' | 'rejected' | 'waited' | 'draft';
export type StatusTypes = (typeof StatusTypesVals)[number];

const StatusDataMap: Record<
	StatusTypes,
	{
		color: SkyAllianceBaseColorsNamesType;
		background: SkyAllianceBaseColorsNamesType;
		label: string;
	}
> = {
	analyze: {
		color: 'StatusText1',
		background: 'StatusBg1',
		label: 'Анализ',
	},
	'in-work': {
		color: 'StatusText2',
		background: 'StatusBg2',
		label: 'В работе',
	},
	done: {
		color: 'StatusText3',
		background: 'StatusBg3',
		label: 'Выполнено',
	},
	specified: {
		color: 'StatusText4',
		background: 'StatusBg4',
		label: 'Уточнение',
	},
	rejected: {
		color: 'StatusText5',
		background: 'StatusBg5',
		label: 'Отменено',
	},
	waited: {
		color: 'StatusText6',
		background: 'StatusBg6',
		label: 'Ожидание',
	},
	draft: {
		color: 'StatusText7',
		background: 'StatusBg7',
		label: 'Черновик',
	},
};

type Props = {
	status: StatusTypes;
};

export const StatusBadge = (props: Props) => {
	const {status} = props;
	const {background, color, label} = StatusDataMap[status];
	return (
		<Badge color={color} backgroundColor={background}>
			{label}
		</Badge>
	);
};
