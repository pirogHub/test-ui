import React from 'react';

import {Badge} from '../badge';

type StatusTypes = 'analyze' | 'in-work' | 'done' | 'specified' | 'rejected' | 'waited' | 'draft';

const StatusDataMap: Record<
	StatusTypes,
	{
		color: string;
		background: string;
		label: string;
	}
> = {
	analyze: {
		color: '#2062F1',
		background: '#EBF1FD',
		label: 'Анализ',
	},
	'in-work': {
		color: '#7D22CE',
		background: '#F3E8FF',
		label: 'В работе',
	},
	done: {
		color: '#417A47',
		background: '#DAF4CB',
		label: 'Выполнено',
	},
	specified: {
		color: '#F2B200',
		background: '#FFF9DE',
		label: 'Уточнение',
	},
	rejected: {
		color: '#EB5526',
		background: '#FFE8E4',
		label: 'Отменено',
	},
	waited: {
		color: '#F39B0E',
		background: '#FFEFD7',
		label: 'Ожидание',
	},
	draft: {
		color: '#757575',
		background: '#F5F5F5',
		label: 'Черновик',
	},
};

type Props = {
	status: StatusTypes;
};

export const BadgeStatus = (props: Props) => {
	const {status} = props;
	const {background, color, label} = StatusDataMap[status];
	return (
		<Badge color={color} backgroundColor={background}>
			{label}
		</Badge>
	);
};
