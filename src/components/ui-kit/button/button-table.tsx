import React from 'react';

import {styled} from '@mui/material';

// import {Flex, FlexRow} from '../flex';
import TableButtonMulti from './table-button-muilti';

const Table = styled('div')`
	display: grid;
	grid-template-columns: 200px repeat(4, 1fr); /* Первая колонка шире */
	border: 1px solid rgb(221, 221, 221);
`;

const HeaderCell = styled('div')`
	font-weight: bold;
	text-align: center;
	padding: 10px;
	border: 1px solid #ddd;
`;
const states = ['normal', 'hover', 'active', 'disabled'];

const ButtonTable = () => {
	return (
		<Table>
			<HeaderCell></HeaderCell>
			{states.map((state) => (
				<HeaderCell key={state}>{state}</HeaderCell>
			))}
			<TableButtonMulti view="primary" size="xl" />
			<TableButtonMulti view="primary" size="m" />
			<TableButtonMulti view="secondary" size="xl" />
			<TableButtonMulti view="secondary" size="m" />
			<TableButtonMulti view="outline" size="xl" />
			<TableButtonMulti view="outline" size="m" />

			<TableButtonMulti view="flatted" size="xl" />
			<TableButtonMulti view="flatted" size="m" />
		</Table>
	);
};

export default ButtonTable;
