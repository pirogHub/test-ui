import React from 'react';

import {Grid2, styled} from '@mui/material';

import {getIconUrlByName} from '@/shared/icons/icons-data';
import Icon, {Icon2} from '@/shared/ui/icon/icon';
import {FlexRow} from '@/shared/ui/layout';

import Button from './button';

interface TableButtonProps {
	variant: 'contained' | 'outline' | 'secondary' | 'flatted';
	size: 'mylarge' | 'mysmall';
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
				<Button {...props} label="Button" />
			</Cell>
			<Cell>
				<Button {...props} label="Button" className="hover" />
			</Cell>
			<Cell>
				<Button {...props} label="Button" className="active" />
			</Cell>
			<Cell>
				<Button {...props} label="Button" disabled />
			</Cell>
		</>
	);
};

const TableButtonMulti = ({variant, size}: TableButtonProps) => {
	const iconSize = size === 'mylarge' ? 24 : 20;

	return (
		<>
			<FourButtonsRow rowName="normal" variant={variant} size={size} />
			{/* </FlexRow> */}
			{/* <FlexRow> */}
			{/* <div>left icon</div> */}
			<FourButtonsRow
				rowName="left icon"
				variant={variant}
				size={size}
				leftComponent={<Icon2 color="red" size={iconSize} url={getIconUrlByName('search')} />}
			/>
			{/* <Button
					leftComponent={<Icon2 color="red" size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					variant={variant}
					label="Button"
				/>
				<Button
					className="hover"
					leftComponent={<Icon2 color="red" size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					variant={variant}
					label="Button"
				/>
				<Button
					className="active"
					leftComponent={<Icon2 color="red" size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					variant={variant}
					label="Button"
				/>

				<Button
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					disabled
					size={size}
					variant={variant}
					label="Button"
				/> */}
			{/* </FlexRow> */}
			{/* <FlexRow> */}
			{/* <div>right icon</div> */}
			<FourButtonsRow
				rowName="right icon"
				variant={variant}
				size={size}
				rightComponent={<Icon2 size={iconSize} url={getIconUrlByName('chevronDown')} />}
			/>
			{/* <Button
					rightComponent={<Icon2 size={iconSize} url={getIconUrlByName('chevronDown')} />}
					size={size}
					variant={variant}
					label="Button"
				/>

				<Button
					rightComponent={<Icon2 size={iconSize} url={getIconUrlByName('chevronDown')} />}
					disabled
					size={size}
					variant={variant}
					label="Button"
				/> */}

			<Cell>only icon</Cell>
			<Cell sx={{gap: '5px', borderBottom: '1px solid black'}}>
				<Button
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					variant={variant}
				/>

				<Button
					isMyRounded
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					variant={variant}
				/>
			</Cell>
			<Cell sx={{gap: '5px', borderBottom: '1px solid black'}}>
				<Button
					className="hover"
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					variant={variant}
				/>

				<Button
					className="hover"
					isMyRounded
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					variant={variant}
				/>
			</Cell>
			<Cell sx={{gap: '5px', borderBottom: '1px solid black'}}>
				<Button
					className="active"
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					variant={variant}
				/>

				<Button
					className="active"
					isMyRounded
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					size={size}
					variant={variant}
				/>
			</Cell>

			<Cell sx={{gap: '5px', borderBottom: '1px solid black'}}>
				<Button
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					disabled
					size={size}
					variant={variant}
				/>

				<Button
					isMyRounded
					leftComponent={<Icon2 size={iconSize} url={getIconUrlByName('search')} />}
					disabled
					size={size}
					variant={variant}
				/>
			</Cell>
		</>
	);
};

export default TableButtonMulti;
