import React from 'react';

import {styled} from '@mui/material';

import {Flex, FlexRow} from '@/shared/ui/layout';

// import {Flex, FlexRow} from '../flex';
import TableButtonMulti from './table-button-muilti';

const Table = styled('div')`
	display: grid;
	grid-template-columns: 200px repeat(4, 1fr); /* Первая колонка шире */
	border: 1px solid #ddd;
`;

const HeaderCell = styled('div')`
	font-weight: bold;
	text-align: center;
	padding: 10px;
	background-color: #f7f7f7;
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
			<TableButtonMulti variant="contained" size="mylarge" />
			<TableButtonMulti variant="contained" size="mysmall" />
			<TableButtonMulti variant="secondary" size="mylarge" />
			<TableButtonMulti variant="secondary" size="mysmall" />
			<TableButtonMulti variant="outline" size="mylarge" />
			<TableButtonMulti variant="outline" size="mysmall" />
			<TableButtonMulti variant="flatted" size="mylarge" />
			<TableButtonMulti variant="flatted" size="mysmall" />
		</Table>
	);
};

export default ButtonTable;
