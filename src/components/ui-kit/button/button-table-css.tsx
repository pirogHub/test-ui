import React from 'react';

import {styled} from '@mui/material';

// import {Flex, FlexRow} from '../flex';
import TableButtonMultiCss from './table-button-muilti-css';

const Table = styled('div')`
	display: grid;
	grid-template-columns: 200px repeat(4, 1fr); /* Первая колонка шире */
	border: 1px solid #ddd;
`;

const HeaderCell = styled('div')`
	font-weight: bold;
	text-align: center;
	padding: 10px;
	border: 1px solid #ddd;
`;
const states = ['normal', 'hover', 'active', 'disabled'];

const ButtonTableCss = () => {
	return (
		<Table>
			<HeaderCell></HeaderCell>
			{states.map((state) => (
				<HeaderCell key={state}>{state}</HeaderCell>
			))}
			<TableButtonMultiCss view="primary" size="xl" />
			<TableButtonMultiCss view="primary" size="m" />
			<TableButtonMultiCss view="secondary" size="xl" />
			<TableButtonMultiCss view="secondary" size="m" />
			<TableButtonMultiCss view="outline" size="xl" />
			<TableButtonMultiCss view="outline" size="m" />

			<TableButtonMultiCss view="flatted" size="xl" />
			<TableButtonMultiCss view="flatted" size="m" />
		</Table>
	);
};

export default ButtonTableCss;
