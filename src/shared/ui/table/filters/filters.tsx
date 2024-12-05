import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

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
type filterFuncExecutor = Exclude<
	React.ComponentProps<typeof Filters<(typeof executors)[0]>>['filterFunction'],
	undefined
>;
const FiltersDataToShow = {
	status: {
		key: 'status',
		label: 'Статус',
		data: statuses,
		filterIconComponentName: 'quill',
		renderItem: (item: (typeof statuses)[0]) => <StatusBadge status={item.data} />,
		filterFunction: undefined,
		withoutCheckbox: true,
		withoutCheckAll: true,
	},
	type: {
		key: 'type',
		label: 'Тип',
		data: appTypes,
		filterIconComponentName: 'sliders',
		renderItem: (item: (typeof appTypes)[0]) => <span>{item.label}</span>,
		filterFunction: undefined,
		withoutCheckbox: true,
		withoutCheckAll: true,
	},
	executor: {
		key: 'executor',
		label: 'Исполнитель',
		data: executors,
		filterIconComponentName: 'user02',
		renderItem: (item: (typeof executors)[0]) => <span>{item.name}</span>,
		filterFunction: (searchTerm, item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) as filterFuncExecutor,
		withoutCheckbox: true,
	},
};

const FiltersListFullConstant = Object.values(FiltersDataToShow);

type FiltersType = keyof typeof FiltersDataToShow;

type BaseItemType = {
	key: string | number;
	withoutCheckbox?: boolean;
};

const FilterButton = styled('button')`
	position: relative;
	display: flex;
	align-items: center;
	gap: 6px;
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
	transition: gap 0.05s cubic-bezier(1, 0.01, 1, 1.2);
	&:has(div.hide) {
		gap: 3px;
	}
	& .count-info {
		padding: 4px;
		border-radius: 5px;
		background-color: ${(p) => (p.theme as skyAllianceMUITheme).colors.backgroundAccent};
		color: ${(p) => (p.theme as skyAllianceMUITheme).colors.primary1};
		width: 20px;
		height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 11px;
		font-weight: 600;

		/* transition: all 0.12s cubic-bezier(1, 0.01, 1, 1.2);

		&.hide {
			transition: all 0.1s cubic-bezier(1, 0.01, 1, 1.2);

			width: 0;
			height: 0;
			opacity: 0;

			padding: 0;
			font-size: 0;
		} */
	}
`;

const CustomFader = styled('div', {
	shouldForwardProp: (propName) => propName !== 'timeout',
})<{timeout?: number}>`
	/* transition: all 0.12s cubic-bezier(1, 0.01, 1, 1.2); */
	transition: all ${(p) => p.timeout || '120'}ms cubic-bezier(1, 0.01, 1, 1.2);
	white-space: nowrap;

	width: 100%;
	&.hide {
		transition: all ${(p) => p.timeout || '120'}ms cubic-bezier(1, 0.01, 1, 1.2);

		width: 0;
		height: 0;
		opacity: 0;

		padding: 0;
		font-size: 0;
	}
`;

type FiltersProps<T extends BaseItemType> = {
	controlledSelectedData?: BaseItemType[];
	controlledSetSelectedData?: (data: BaseItemType[]) => void;
	filterKey: string;
	onClose?: (filterKey?: string) => void;
	withoutShowCount?: boolean;
	withoutChest?: boolean;
	withoutCheckAll?: boolean;
	dataToShow: T[];
	renderItem: (dataItem: T) => React.ReactNode;
	onSetData?: (data: string[]) => void;
	label: string;
	filterFunction?: (searchTerm: string, dataItem: T) => boolean;
	filterIconComponent?: React.ReactNode;
	withoutActionsButtons?: boolean;
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
		background-color: #ddd;

		& .SkyIcon {
			background-color: #fff;
		}
	}
`;

const Filters = <T extends BaseItemType>({
	controlledSelectedData,
	controlledSetSelectedData,
	filterKey,
	onClose,
	withoutChest,
	withoutCheckAll,
	withoutShowCount,
	onSetData,
	filterFunction,
	dataToShow,
	renderItem,
	label,
	filterIconComponent,
	withoutActionsButtons,
	minPopupWidth,
	maxPopupHeight,
	clearFilterFlag,
}: FiltersProps<T>) => {
	const [_checkedData, _setCheckedData] = React.useState<Partial<Record<T['key'], boolean>>>();
	// const checkedDataRef = useRef(checkedData);
	// checkedDataRef.current = checkedData;

	const checkedData = controlledSelectedData ? controlledSelectedData : _checkedData;
	const setCheckedData = controlledSetSelectedData ? controlledSetSelectedData : _setCheckedData;
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

		onSetData?.(selectedKeys);
	}, [checkedData]);

	const [searchTerm, setSearchTerm] = useState('');
	const [isSelectedAll, setIsSelectedAll] = useState(false);
	const isSelectedAllRef = useRef(isSelectedAll);
	isSelectedAllRef.current = isSelectedAll;

	const filteredDataList = React.useMemo(() => {
		const filtered = !filterFunction ? dataToShow : dataToShow.filter((item) => filterFunction(searchTerm, item));

		return filtered;
	}, [searchTerm, dataToShow, filterFunction]);

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

	const [checkedCountFreezeBeforeClose, setCheckedCountFreezeBeforeClose] = useState(checkedCount);
	useEffect(() => {
		if (checkedCount !== 0) setCheckedCountFreezeBeforeClose(checkedCount);
	}, [checkedCount]);
	return (
		<div>
			<FilterButton onClick={handleClick}>
				<div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
					{filterIconComponent}
					{Boolean(label) && <label>{label}</label>}

					{/* <Fade
						onTransitionEnd={() => console.log('end')}
						timeout={400}
						//  in={Boolean(checkedCount)}
						in={true}
					> */}

					{/* </Fade> */}
				</div>

				{!withoutShowCount && (
					<CustomFader className={`count-info ${!checkedCount && 'hide'}`}>
						<div>{checkedCountFreezeBeforeClose}</div>
					</CustomFader>
				)}

				{!withoutChest && (
					<ChestWrapper>
						<Icon2
							onClick={(e) => {
								e.stopPropagation();
								handleDeselectAll();
								onClose?.(filterKey);
							}}
							sx={{opacity: 1}}
							color="icon2"
							size={20}
							url={getIconUrlByName('chest')}
						/>
					</ChestWrapper>
				)}
			</FilterButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				onClick={(e) => {
					const target = e.target as HTMLElement;

					const itemId = target.closest('[data-item-id]')?.getAttribute('data-item-id') as T['key']; //(T[0]['key'];
					console.log('>>click', itemId);
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
					{!withoutCheckAll && (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '8px',
								paddingInline: '8px',
								// paddingBottom: '8px',
								paddingBlock: '8px',
							}}
						>
							<MenuItem
								sx={{
									borderRadius: '4px',
									width: '100%',
									height: '40px',
									paddingLeft: '4px',
									gap: '12px',
								}}
							>
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
							</MenuItem>
						</div>
					)}
					<div style={{borderBottom: '1px solid rgba(234, 234, 234, 1)'}}></div>
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
											sx={{
												borderRadius: '4px',
												height: '40px',
												paddingLeft: '4px',
												gap: '12px',
											}}
											data-item-id={item.key}
											disableRipple
											key={item.key}
										>
											{item.withoutCheckbox ? null : (
												<Checkbox
													size="small"
													sx={{padding: '0'}}
													disableRipple
													checked={checkedData?.[item.key as T['key']] || false}
												/>
											)}
											{renderItem(item)}
										</MenuItem>
									);
								})}
							</div>
						</div>
					</div>
					{!withoutActionsButtons && (
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								padding: '10px 12px 10px 12px',
								borderTop: '1px solid rgba(234, 234, 234, 1)',
							}}
						>
							{/* <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
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
							</div> */}
							<div style={{display: 'flex', gap: '8px'}}>
								<ButtonStyled size="s" view="outline" onClick={handleDeselectAll}>
									Сбросить
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
		// selectedStatuses,
		// setSelectedStatuses,
		// selectedAppTypes,
		// setSelectedAppTypes,
		// selectedExecutors,
		// setSelectedExecutors,
		data: {status: selectedStatuses, type: selectedAppTypes, executor: selectedExecutors},
		setters,
	} = useTableStore();

	const isShowClearAll = selectedStatuses.length > 0 || selectedAppTypes.length > 0 || selectedExecutors.length > 0;

	type RRR = React.ComponentProps<typeof Filters<(typeof executors)[0]>>['filterFunction'];
	const filterFunction = useCallback<Exclude<RRR, undefined>>(
		(searchTerm, item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()),
		[],
	);

	const [clearAllFlag, setClearAllFlag] = React.useState(false);

	// const [filtersListShowed, setFiltersListShowed] = React.useState<FiltersType[]>([]);
	const [filtersListShowed, setFiltersListShowed] = React.useState<Partial<Record<T['key'], boolean>>>();

	const [filtersListShowed2, setFiltersListShowed2] = React.useState<FiltersType[]>([]);

	const filtersListNotShowed = useMemo(() => {
		// console.log('---------');

		const result = FiltersListFullConstant.filter((item) => {
			// console.log('item.key', item.key);
			console.log('filtersListShowed2', filtersListShowed2);

			const isAlreadyShowed = filtersListShowed2.includes(item.key);
			return !isAlreadyShowed; // TODO поменять на чек как поле в объекте
		});
		// console.log('-result', result);
		return result;
	}, [filtersListShowed2]);

	const removeFilter = useCallback(
		(key: string) => {
			setFiltersListShowed((prev) => {
				console.log('prev', key, prev);

				return {
					...prev,
					[key]: false,
				};
			});
		},
		[setFiltersListShowed],
	);

	// useEffect(() => {
	// 	console.log('filtersListNotShowed', filtersListNotShowed);
	// }, [filtersListNotShowed]);
	useEffect(() => {
		console.log('filtersListShowed', filtersListShowed);
	}, [filtersListShowed]);

	const filtersList = useMemo(() => {
		const result = filtersListShowed2.map((name) => {
			const item = FiltersDataToShow[name];
			return {
				key: name,
				label: item.label,
				clearAllFlag: true,
				filterIconComponentName: item.filterIconComponentName,
				onSetData: setters[name],
				dataToShow: item.data,
				renderItem: item.renderItem,
				filterFunction: item?.filterFunction,
				onClose: removeFilter,
			};
		});
		return result;
	}, [filtersListShowed2]);

	return (
		<div style={{display: 'flex', justifyContent: 'space-between'}}>
			<div style={{display: 'flex', gap: '8px', paddingBlock: '20px'}}>
				{filtersList.map((it) => {
					return (
						<Filters
							filterKey={it.key}
							key={it.key}
							clearFilterFlag={it.clearAllFlag}
							label={it.label}
							filterIconComponent={
								<Icon2 color="icon2" size={20} url={getIconUrlByName(it.filterIconComponentName)} />
							}
							onSetData={it.onSetData}
							dataToShow={it.dataToShow}
							renderItem={it.renderItem}
							onClose={it.onClose}
							filterFunction={it?.filterFunction}
							withoutCheckAll={it?.withoutCheckAll}
						/>
					);
				})}
				{/* <Filters
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
					label="Исполнитель"
					filterIconComponent={<Icon2 color="icon2" size={20} url={getIconUrlByName('user02')} />}
					filterFunction={filterFunction}
					onSetData={setSelectedExecutors}
					dataToShow={executors}
					renderItem={(item) => <span>{item.name}</span>}
				/> */}

				<div>
					<Filters
						withoutChest
						withoutCheckAll
						withoutActionsButtons
						withoutShowCount
						clearFilterFlag={clearAllFlag}
						controlledSetSelectedData={setFiltersListShowed}
						controlledSelectedData={filtersListShowed}
						// label="Исполнитель"
						filterIconComponent={<Icon2 color="icon2" size={20} url={getIconUrlByName('filterAdd')} />}
						// filterFunction={filterFunction}
						onSetData={(data) => {
							// 	console.log('data', data);

							setFiltersListShowed2([...data]);
						}}
						dataToShow={filtersListNotShowed}
						renderItem={(item) => (
							<div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
								<Icon2
									sx={{opacity: 1}}
									color="icon2"
									size={20}
									url={getIconUrlByName(item.filterIconComponentName)}
								/>
								{item.label}
							</div>
						)}
					/>
					{/* <ButtonStyled
						size="m"
						view="flatted"
						isOnlyIcon
						leftComponent={<Icon2 size={20} url={getIconUrlByName('filterAdd')} />}
					/> */}
				</div>
				<CustomFader timeout={200} className={`${isShowClearAll ? '' : 'hide'}`}>
					<ButtonStyled
						size="m"
						view="flatted"
						onClick={() => setClearAllFlag((prev) => !prev)}
						label="Очистить фильтры"
					/>
				</CustomFader>
			</div>
			<div style={{paddingBlock: '20px'}}>
				<CreateProposal />
			</div>
		</div>
	);
};

export default FiltersVariants;
