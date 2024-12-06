import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, {SelectChangeEvent} from '@mui/material/Select';

import {StatusBadge, StatusTypes, StatusTypesVals} from '../../status-badge/badge-status';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 224,
		},
	},
};

const statuses: StatusTypes[] = [...StatusTypesVals];

const Filters = () => {
	const [personName, setPersonName] = React.useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: {value},
		} = event;
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		);
	};

	return (
		<div>
			{/* <FormControl > */}
			{/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
			<Select
				// labelId="demo-multiple-checkbox-label"
				// id="demo-multiple-checkbox"
				sx={{m: 1, width: 100, '& legend': {display: 'none'}}}
				multiple
				disableUnderline
				value={personName}
				onChange={handleChange}
				// input={<OutlinedInput label="Tag" />}
				renderValue={(selected) => selected.join(', ')}
				MenuProps={MenuProps}
				// variant="standard"
			>
				{statuses.map((status) => (
					<MenuItem disableRipple key={status} value={status}>
						<Checkbox disableRipple checked={personName.includes(status)} />
						<StatusBadge status={status} />
					</MenuItem>
				))}
			</Select>
			{/* </FormControl> */}
		</div>
	);
};

export default Filters;
