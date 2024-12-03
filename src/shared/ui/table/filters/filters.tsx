import React, {useEffect, useState} from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {skyAllianceMUITheme} from '@/styles/theme';
import {Fade, Popover, styled} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, {SelectChangeEvent} from '@mui/material/Select';

import {getIconUrlByName} from '@/shared/icons/icons-data';

import {Icon2} from '../../icon';
import {InputField} from '../../input';
import {StatusBadge, StatusTypes, StatusTypesVals} from '../../status-badge/badge-status';

const statuses: {key: string; data: StatusTypes}[] = [...StatusTypesVals].map((item) => ({
	key: item,
	data: item,
}));
const executors = [
	{key: 1, name: 'Иван Иванов'},
	{key: 2, name: 'Пётр Петров'},
	{key: 3, name: 'Сергей Сергеев'},
	{key: 4, name: 'Алексей Алексеев'},
	{key: 5, name: 'Дмитрий Дмитриев'},
	{key: 6, name: 'Николай Николаев'},
	{key: 7, name: 'Михаил Михайлов'},
	{key: 8, name: 'Андрей Андреев'},
	{key: 9, name: 'Владимир Владимиров'},
	{key: 10, name: 'Александр Александров'},
	{key: 11, name: 'Юрий Юрьев'},
	{key: 12, name: 'Олег Олегов'},
	{key: 13, name: 'Максим Максимов'},
	{key: 14, name: 'Евгений Евгеньев'},
	{key: 15, name: 'Игорь Игорев'},
	{key: 16, name: 'Роман Романов'},
];

const FilterButton = styled('button')`
	position: relative;
	display: flex;
	align-items: center;
	gap: 8px;
	cursor: pointer;
	border: none;
	outline: none;
	border-radius: 12px;
	height: 40px;
	border: 1px solid ${(p) => (p.theme as skyAllianceMUITheme).colors.base3};
	color: ${(p) => (p.theme as skyAllianceMUITheme).colors.text2};
	background-color: ${(p) => (p.theme as skyAllianceMUITheme).colors.base1};

	&:hover,
	&.hover {
		background-color: ${(p) => (p.theme as skyAllianceMUITheme).colors.base5};
	}

	&:active,
	&.active {
	}

	&:disabled,
	&.disabled {
		cursor: 'default';

		opacity: '0.4';

		& .SkyIcon {
			background-color: ${(p) => (p.theme as skyAllianceMUITheme).colors.icon2};
		}
	}

	& label {
		font-size: 14px;
		font-weight: 600;
		line-height: 20px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		cursor: pointer;
	}
	& .rounded-info {
		position: absolute;
		right: 0;
		top: 0;
		transform: translate(0, -50%);
		padding: 4px;
		border-radius: 50%;
		background-color: ${(p) => (p.theme as skyAllianceMUITheme).colors.primary1};
		color: ${(p) => (p.theme as skyAllianceMUITheme).colors.base1};
		aspect-ratio: 1 / 1;
		height: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 12px;
	}
`;

type FiltersProps<T extends {key: string | number}> = {
	dataToShow: T[];
	renderItem: (dataItem: T) => React.ReactNode;
	onSetData: (data: string[]) => void;

	filterFunction?: (searchTerm: string, dataItem: T) => boolean;
};

const Filters = <T extends {key: string | number}>({
	onSetData,
	filterFunction,
	dataToShow,
	renderItem,
}: FiltersProps<T>) => {
	const [checkedData, setCheckedData] = React.useState<Partial<Record<T['key'], boolean>>>();
	const [checkedCount, setCheckedCount] = React.useState<number>();

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	React.useEffect(() => {
		setCheckedCount(checkedData ? Object.values(checkedData).filter(Boolean).length : 0);
		const allkeys = Object.keys(checkedData ? checkedData : {});
		const selectedKeys = allkeys.filter((key) => Boolean(checkedData?.[key as T['key']]));
		onSetData(selectedKeys);
	}, [checkedData]);
	const [searchTerm, setSearchTerm] = useState('');

	const filteredDataList = React.useMemo(() => {
		return !filterFunction ? dataToShow : dataToShow.filter((item) => filterFunction(searchTerm, item));
		// return statuses.filter((item) => {
		// 	return (
		// 		// <MenuItem key={item} value={item}>
		// 		// 	<Checkbox checked={checkedData?.[item] || false} />
		// 		// 	<ListItemText primary={item} />
		// 		// </MenuItem>
		// 	);
		// });
	}, [searchTerm, filterFunction]);

	return (
		<div>
			<FilterButton onClick={handleClick}>
				<div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
					<Icon2 color="icon2" size={20} url={getIconUrlByName('chevronDown')} />
					<label>Filter</label>
				</div>
				<Icon2
					sx={{
						transform: open ? 'rotate(180deg)' : '',
						transition: 'all 0.3s ease-in-out',
					}}
					color="icon2"
					size={20}
					url={getIconUrlByName('chevronDown')}
				/>
				<Fade in={Boolean(checkedCount)}>
					<div className="rounded-info">
						<div>{checkedCount || 1}</div>
					</div>
				</Fade>
			</FilterButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				onClick={(e) => {
					const target = e.target as HTMLElement;
					const itemId = target.closest('[data-item-id]')?.getAttribute('data-item-id') as T['key']; //(T[0]['key'];
					if (itemId) {
						setCheckedData((prev) => {
							if (!prev) return {[itemId]: true} as Partial<Record<T['key'], boolean>>;

							return {
								...prev,
								[itemId]: !prev?.[itemId],
							} as Partial<Record<T['key'], boolean>>;
						});
					}
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<div
					style={{
						padding: '4px',
						boxSizing: 'border-box',
						overflow: 'hidden',
					}}
				>
					<InputField debounceMs={500} onChangeValue={setSearchTerm} isWithClearButton />
					<div
						style={{
							minWidth: '224px',
							maxHeight: '200px',
							boxSizing: 'border-box',
							overflow: 'auto',
						}}
					>
						{filteredDataList.map((item) => {
							return (
								<MenuItem
									sx={{borderRadius: '4px', height: '40px', paddingLeft: '0px'}}
									data-item-id={item.key}
									disableRipple
									key={item.key}
									// value={status}
								>
									<Checkbox
										size="small"
										sx={{padding: '10px'}}
										disableRipple
										checked={checkedData?.[item.key as T['key']] || false}
									/>
									{renderItem(item)}
								</MenuItem>
							);
						})}
					</div>
				</div>
			</Popover>
		</div>
	);
};
const FiltersVariants = () => {
	const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);
	const [selectedExecutors, setSelectedExecutors] = React.useState<string[]>([]);

	useEffect(() => {
		console.log('selectedStatuses', selectedStatuses);
	}, [selectedStatuses]);
	useEffect(() => {
		console.log('selectedExecutors', selectedExecutors);
	}, [selectedExecutors]);

	return (
		<div>
			<Filters
				onSetData={setSelectedStatuses}
				dataToShow={statuses}
				renderItem={(item) => <StatusBadge status={item.data} />}
			/>
			<Filters
				filterFunction={(searchTerm, item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())}
				onSetData={setSelectedExecutors}
				dataToShow={executors}
				renderItem={(item) => <span>{item.name}</span>}
			/>
		</div>
	);
};

export default FiltersVariants;
