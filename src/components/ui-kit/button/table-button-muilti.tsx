import React from 'react';

import {Grid2, styled} from '@mui/material';

import {getIconUrlByName} from '@/shared/icons/icons-data';
import Icon, {Icon2} from '@/shared/ui/icon/icon';
import {FlexRow} from '@/shared/ui/layout';

import Button from './button';
import {ButtonSize, ButtonStyled, ButtonView} from './button-styled';

interface TableButtonProps {
	view: ButtonView;
	// size: 'mylarge' | 'mysmall';
	size: ButtonSize;
}

const states = ['normal', 'hover', 'active', 'disabled'];
const configurations = ['default', 'with left icon', 'with right icon', 'only icon'];

const Cell = styled('div')`
	text-align: center;
	padding: 10px;
	border-inline: 1px solid #eee;
	border-block: 2px solid #ddd;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const RowLabel = styled('div')`
	font-weight: bold;
	text-align: left;
	padding: 10px;
	background-color: #f7f7f7;
	border: 1px solid #ddd;
`;

const FourButtonsRow = ({
	rowName,
	...props
}: TableButtonProps & {leftComponent?: React.ReactNode; rightComponent?: React.ReactNode; rowName: string}) => {
	return (
		<>
			<Cell>{rowName}</Cell>
			<Cell>
				<ButtonStyled {...props} label="Button" />
			</Cell>
			<Cell>
				<ButtonStyled {...props} label="Button" className="hover" />
			</Cell>
			<Cell>
				<ButtonStyled {...props} label="Button" className="active" />
			</Cell>
			<Cell>
				<ButtonStyled {...props} label="Button" disabled />
			</Cell>
		</>
	);
};

const TableButtonMulti = ({view, size}: TableButtonProps) => {
	const iconSize = size === 'xl' ? 24 : 20;

	return (
		<>
			<FourButtonsRow rowName="normal" view={view} size={size} />

			<FourButtonsRow
				rowName="left icon"
				view={view}
				size={size}
				leftComponent={<Icon2 color="red" size={iconSize} url={getIconUrlByName('search')} />}
			/>

			<FourButtonsRow
				rowName="right icon"
				view={view}
				size={size}
				rightComponent={<Icon2 size={iconSize} url={getIconUrlByName('chevronDown')} />}
			/>

			<Cell>only icon</Cell>
			<Cell sx={{gap: '5px', borderBottom: '1px solid black'}}>
				<ButtonStyled
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					view={view}
				/>

				<ButtonStyled
					isRounded
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					view={view}
				/>
			</Cell>
			<Cell sx={{gap: '5px', borderBottom: '1px solid black'}}>
				<ButtonStyled
					className="hover"
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					view={view}
				/>

				<ButtonStyled
					className="hover"
					isRounded
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					view={view}
				/>
			</Cell>
			<Cell sx={{gap: '5px', borderBottom: '1px solid black'}}>
				<ButtonStyled
					className="active"
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					view={view}
				/>

				<ButtonStyled
					className="active"
					isRounded
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					view={view}
				/>
			</Cell>

			<Cell sx={{gap: '5px', borderBottom: '1px solid black'}}>
				<ButtonStyled
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					disabled
					size={size}
					view={view}
				/>

				<ButtonStyled
					isRounded
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					disabled
					size={size}
					view={view}
				/>
			</Cell>
		</>
	);
};

export default TableButtonMulti;
