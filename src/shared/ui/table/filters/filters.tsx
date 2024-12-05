import React, {useCallback, useEffect, useRef, useState} from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {useTableStore} from '@/state/use-table-hook';
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
import {CreateProposal} from '../create-proposal';

const statuses: {key: string; data: StatusTypes}[] = [...StatusTypesVals].map((item) => ({
	key: item,
	data: item,
}));
const appTypes = [
	{key: 'inner', label: 'Внутренняя'},
	{key: 'outside', label: 'Заказная'},
];

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
	border: 1px solid ${(p) => (p.theme as skyAllianceMUITheme).colors.base4};
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
	label: string;
	filterFunction?: (searchTerm: string, dataItem: T) => boolean;
	filterIconComponent?: React.ReactNode;
	withActionsButtons?: boolean;
	minPopupWidth?: string;
	maxPopupHeight?: string;
	clearFilterFlag?: boolean;
};

const ChestWrapper = styled('div')`
	display: flex;
	align-items: center;
	gap: 0;
	border-radius: 4px;

	&:hover {
		background-color: #bbb;

		& .SkyIcon {
			background-color: #fff;
		}
	}
`;

const Filters = <T extends {key: string | number}>({
	onSetData,
	filterFunction,
	dataToShow,
	renderItem,
	label,
	filterIconComponent,
	withActionsButtons,
	minPopupWidth,
	maxPopupHeight,
	clearFilterFlag,
}: FiltersProps<T>) => {
	const [checkedData, setCheckedData] = React.useState<Partial<Record<T['key'], boolean>>>();
	const checkedDataRef = useRef(checkedData);
	checkedDataRef.current = checkedData;

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
	const [isSelectedAll, setIsSelectedAll] = useState(false);
	const isSelectedAllRef = useRef(isSelectedAll);
	isSelectedAllRef.current = isSelectedAll;

	const filteredDataList = React.useMemo(() => {
		const filtered = !filterFunction ? dataToShow : dataToShow.filter((item) => filterFunction(searchTerm, item));

		return filtered;
	}, [searchTerm, filterFunction]);

	useEffect(() => {
		if (
			filteredDataList.length > 0 &&
			filteredDataList.every((item) => checkedDataRef.current?.[item.key as T['key']])
		) {
			if (!isSelectedAllRef.current) setIsSelectedAll(true);
		} else {
			setIsSelectedAll(false);
		}
	}, [checkedData, filteredDataList]);

	const handleDeselectAll = () => {
		setCheckedData({});
		setIsSelectedAll(false);
	};

	const handleDeselectAllCurrent = () => {
		setIsSelectedAll(false);
		setCheckedData((prev) => {
			return {
				...prev,
				...filteredDataList.reduce((acc, item) => ({...acc, [item.key]: false}), {}),
			};
		});
	};

	const handleSelectAllCurrent = () => {
		setIsSelectedAll(true);
		setCheckedData((prev) => {
			return {
				...prev,
				...filteredDataList.reduce((acc, item) => ({...acc, [item.key]: true}), {}),
			};
		});
	};

	useEffect(() => {
		handleDeselectAll();
	}, [clearFilterFlag]);

	const onSelectAllClick = () => {
		console.log(isSelectedAllRef.current);

		if (isSelectedAllRef.current) {
			handleDeselectAllCurrent();
		} else {
			handleSelectAllCurrent();
		}
	};

	useEffect(() => {}, []);
	return (
		<div>
			<FilterButton onClick={handleClick}>
				<div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
					{filterIconComponent}
					<label>{label}</label>
				</div>
				{checkedCount ? null : (
					<ChestWrapper style={{opacity: 0}}>
						<div style={{height: '100%', width: '1px', borderLeft: '1px solid #C4C4C4'}}>&nbsp;</div>
						<Icon2 sx={{opacity: 1}} color="icon2" size={20} url={getIconUrlByName('chest')} />
					</ChestWrapper>
				)}
				<Icon2
					sx={{
						transform: open ? 'rotate(180deg)' : '',
						transition: 'all 0.3s ease-in-out',
					}}
					color="icon2"
					size={20}
					url={getIconUrlByName('chevronDown')}
				/>
				{!checkedCount ? null : (
					<ChestWrapper>
						<div style={{height: '100%', width: '1px', borderLeft: '1px solid #C4C4C4'}}>&nbsp;</div>
						<Icon2
							onClick={(e) => {
								e.stopPropagation();
								handleDeselectAll();
							}}
							sx={{opacity: 1}}
							color="icon2"
							size={20}
							url={getIconUrlByName('chest')}
						/>
					</ChestWrapper>
				)}
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
					}}
				>
					{Boolean(filterFunction) && (
						<InputField
							isWithoutErrors
							size="medium"
							debounceMs={500}
							onChangeValue={setSearchTerm}
							isWithClearButton
							sxWrapper={{margin: '8px '}}
						/>
					)}
					<div style={{padding: '8px'}}>
						<div
							style={{
								minWidth: minPopupWidth || '224px',
								maxHeight: maxPopupHeight || '200px',
								overflow: 'auto',
							}}
						>
							<div
								style={{
									boxSizing: 'border-box',

									minHeight: '100%',
								}}
							>
								{filteredDataList.map((item) => {
									return (
										<MenuItem
											sx={{borderRadius: '4px', height: '40px', paddingLeft: '4px', gap: '12px'}}
											data-item-id={item.key}
											disableRipple
											key={item.key}
										>
											<Checkbox
												size="small"
												sx={{padding: '0'}}
												disableRipple
												checked={checkedData?.[item.key as T['key']] || false}
											/>
											{renderItem(item)}
										</MenuItem>
									);
								})}
							</div>
						</div>
					</div>
					{withActionsButtons && (
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								padding: '10px 12px 10px 12px',
								borderTop: '1px solid rgba(234, 234, 234, 1)',
							}}
						>
							<div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
								<Checkbox
									id="check-all"
									size="small"
									sx={{padding: '0'}}
									disableRipple
									checked={isSelectedAll}
									onClick={onSelectAllClick}
									inputProps={{'aria-label': 'controlled'}}
								/>
								<label style={{cursor: 'pointer'}} htmlFor="check-all">
									Выбрать все
								</label>
							</div>
							<div style={{display: 'flex', gap: '8px'}}>
								<ButtonStyled size="s" view="outline" onClick={handleDeselectAll}>
									Отменить
								</ButtonStyled>
								<ButtonStyled size="s" view="primary" onClick={handleClose}>
									Применить
								</ButtonStyled>
							</div>
						</div>
					)}
				</div>
			</Popover>
		</div>
	);
};
const FiltersVariants = () => {
	// const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);
	// const [selectedAppTypes, setSelectedAppTypes] = React.useState<string[]>([]);
	// const [selectedExecutors, setSelectedExecutors] = React.useState<string[]>([]);

	const {
		selectedStatuses,
		setSelectedStatuses,
		selectedAppTypes,
		setSelectedAppTypes,
		selectedExecutors,
		setSelectedExecutors,
	} = useTableStore();

	// useEffect(() => {
	// 	console.log('selectedStatuses', selectedStatuses);
	// }, [selectedStatuses]);
	// useEffect(() => {
	// 	console.log('selectedExecutors', selectedExecutors);
	// }, [selectedExecutors]);
	// useEffect(() => {
	// 	console.log('selectedAppTypes', selectedAppTypes);
	// }, [selectedAppTypes]);

	type RRR = React.ComponentProps<typeof Filters<(typeof executors)[0]>>['filterFunction'];
	const filterFunction = useCallback<Exclude<RRR, undefined>>(
		(searchTerm, item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()),
		[],
	);

	const [clearAllFlag, setClearAllFlag] = React.useState(false);

	return (
		<div style={{display: 'flex', justifyContent: 'space-between'}}>
			<div style={{display: 'flex', gap: '20px', paddingBlock: '20px'}}>
				<Filters
					clearFilterFlag={clearAllFlag}
					label="Статус"
					filterIconComponent={<Icon2 color="icon2" size={20} url={getIconUrlByName('quill')} />}
					onSetData={setSelectedStatuses}
					dataToShow={statuses}
					renderItem={(item) => <StatusBadge status={item.data} />}
				/>
				<Filters
					clearFilterFlag={clearAllFlag}
					label="Тип"
					filterIconComponent={<Icon2 color="icon2" size={20} url={getIconUrlByName('sliders')} />}
					onSetData={setSelectedAppTypes}
					dataToShow={appTypes}
					renderItem={(item) => <span>{item.label}</span>}
				/>
				<Filters
					clearFilterFlag={clearAllFlag}
					minPopupWidth={'424px'}
					maxPopupHeight={'248px'}
					label="Исполнитель"
					filterIconComponent={<Icon2 color="icon2" size={20} url={getIconUrlByName('user02')} />}
					filterFunction={filterFunction}
					onSetData={setSelectedExecutors}
					dataToShow={executors}
					renderItem={(item) => <span>{item.name}</span>}
					withActionsButtons
				/>

				{(selectedAppTypes.length > 0 || selectedStatuses.length > 0 || selectedExecutors.length > 0) && (
					<ButtonStyled
						size="m"
						view="flatted"
						onClick={() => setClearAllFlag((prev) => !prev)}
						label="Очистить фильтры"
					/>
				)}
			</div>
			<div style={{paddingBlock: '20px'}}>
				<CreateProposal />
			</div>
		</div>
	);
};

export default FiltersVariants;
