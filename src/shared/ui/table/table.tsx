import * as React from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {useTableStore} from '@/state/use-table-hook';
import {skyAllianceMUITheme} from '@/styles/theme';
import {getThemedColor} from '@/styles/theme/colors';
import {MenuItem, PaginationItem, Select, Skeleton} from '@mui/material';
import {styled} from '@mui/material';
import Box from '@mui/material/Box';
// import * as React from 'react';
import MuiPagination from '@mui/material/Pagination';
import TablePagination from '@mui/material/TablePagination';
import {TablePaginationProps} from '@mui/material/TablePagination';
import {
	DataGrid,
	DataGridProps,
	GridRenderCellParams,
	GridSlotsComponentsProps,
	GridTreeNodeWithRender,
	gridPageCountSelector,
	gridPageSizeSelector,
	gridPaginationMetaSelector,
	gridPaginationModelSelector,
	useGridApiContext,
	useGridApiRef,
	useGridSelector,
} from '@mui/x-data-grid';
import {useRouter} from 'next/router';

import {MyIconName, getIconUrlByName} from '@/shared/icons/icons-data';
import {useCustomStore} from '@/shared/providers/store-provider';

import {Icon2} from '../icon';
import {StatusBadge, StatusTypes} from '../status-badge/badge-status';
import Filters from './filters/filters';

interface Data {
	id: number;
	createdAt: number | null;
	appNumber: string;
	status: StatusTypes;
	type: string;
	executor: string;
}

function createData(
	id: number,
	createdAt: number | null,
	appNumber: string,
	status: StatusTypes,
	type: string,
	executor: string,
): Data {
	return {
		id,
		createdAt,
		appNumber,
		status,
		type,
		executor,
	};
}

const labelDictionary: Record<keyof Data, string> & {
	rejectButton: string;
} = {
	id: 'ID',
	appNumber: 'Номер заявки',
	createdAt: 'Дата создания',
	status: 'Статус',
	type: 'Тип',
	executor: 'Исполнитель',
	rejectButton: '',
};

const dictionaryStatus = {
	inner: 'Внутренний',
	outer: 'Внешний',
};

const labelDictionaryReversed = Object.fromEntries(Object.entries(labelDictionary).map(([key, value]) => [value, key]));

const LoadingSkeletons = Array.from({length: 5}).map((_, index) => ({
	id: index,
	skeleton: (
		<Skeleton key={index} sx={{width: '100%', height: '100%', bgcolor: '#eee'}} variant="rectangular" height={50} />
	),
}));

const CustomizeCellContent: (
	params: GridRenderCellParams<Data, unknown, unknown, GridTreeNodeWithRender>,
) => React.ReactNode = (params) => {
	// console.log('props', params);
	// return null;

	const value = params.value as boolean | number | string | null;
	const key = params.field;
	let content = null;
	// const id = rowData.id;
	// console.log('key', key, value);

	if (key === 'skeleton') return LoadingSkeletons[0].skeleton;
	if (key === 'id') return null;
	if (!value) {
		switch (key) {
			case 'rejectButton':
				if (!params.row.status || params.row.status === 'rejected' || params.row.status === 'done')
					content = null;
				else {
					content = (
						<ButtonStyled
							onClick={(e) => {
								e.stopPropagation();
							}}
							label="Отменить"
							view="outline"
						/>
					);
				}
				break;
			default:
				content = null;
				break;
		}
	} else {
		switch (key) {
			case 'createdAt':
				content = new Date(value as number).toLocaleString();
				break;
			case 'appNumber':
				content = <div>{value}</div>;
				break;
			case 'status':
				content = <StatusBadge status={value as StatusTypes} />;
				break;
			case 'type':
				// @ts-expect-error toremove
				content = <div>{dictionaryStatus[value] || value}</div>;
				break;
			case 'executor':
				content = <div>{value}</div>;
				break;
			case 'id':
				content = null;
				break;

			default:
				content = value;
				break;
		}
	}
	return content;
};

// const descendingComparator: DataGridProps['columns'][0]['sortComparator'] = (a, b, cell1, cell2) => {
// 	// console.log(a, b, cell1, cell2);
// 	if (cell1.field === 'status' || typeof a === 'string') {
// 		return -1 * (a as string).localeCompare(b as string);
// 	}

// 	return a - b > 0 ? -1 : 1;
// };
const TablePaginationSelect = styled(Select, {
	name: 'MuiTablePagination',
	slot: 'Select',
	overridesResolver: (props, styles) => ({
		// [`& .${tablePaginationClasses.selectIcon}`]: styles.selectIcon,
		// [`& .${tablePaginationClasses.select}`]: styles.select,
		// ...styles.input,
		// ...styles.selectRoot,
		[`&:after`]: {
			content: '',
		},
	}),
})(({theme}) => {
	const colors = (theme as skyAllianceMUITheme).colors;
	return {
		'&::after, &::before': {
			display: 'none',
		},
		border: `1px solid ${colors.base4}`,
		borderRadius: '8px',
		backgroundColor: colors.base1,
		boxSizing: 'border-box',

		'& .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input ': {
			padding: '4px 22px 4px 12px',
		},

		'& svg': {
			right: '4px',
		},
	};
});
const Pagination = ({
	page,
	onPageChange,
	pageCount,
}: Pick<TablePaginationProps, 'page'> & {pageCount: number; onPageChange: (page: number) => void}) => {
	// const inProps = useGridC()

	return (
		<>
			<MuiPagination
				color="primary"
				siblingCount={1}
				count={pageCount}
				page={page + 1}
				shape="rounded"
				variant="outlined"
				renderItem={(item) => {
					return <PaginationItem className="Styled-MuiPaginationItem" {...item} />;
				}}
				onChange={(e, newPage) => {
					onPageChange(newPage - 1);
				}}
			/>
		</>
	);
};

const CustomFooterStatusComponent = (
	props: NonNullable<GridSlotsComponentsProps['footer']> & {pageSizeOptions: number[]; disabled?: boolean},
) => {
	const apiRef = useGridApiContext();
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);
	const setPageSize = apiRef.current.setPageSize;
	const setPage = apiRef.current.setPage;
	const page1 = apiRef.current.state.pagination.paginationModel.page;
	// console.log('apiRef.current', apiRef.current);
	const pageSize = apiRef.current.state.pagination.paginationModel.pageSize;
	const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
	const pageCount2 = useGridSelector(apiRef, gridPageCountSelector);
	const pageCount3 = useGridSelector(apiRef, gridPageSizeSelector);
	const pageCountmeta = useGridSelector(apiRef, gridPaginationMetaSelector);
	// console.log('page1', pageCount, page1, pageSize, pageCount2, pageCount3);
	// console.log('pageCountmeta', pageCountmeta);

	const {pageSizeOptions, disabled} = props;

	return (
		<Box
			sx={{
				opacity: disabled ? 0.4 : 1,
				p: 1,
				display: 'flex',
				justifyContent: 'space-between',
				position: 'relative',
			}}
		>
			{disabled && (
				<div
					onClick={(e) => e.stopPropagation()}
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						right: 0,
						bottom: 0,
						zIndex: 1,
						cursor: 'default',
					}}
				></div>
			)}
			<Pagination page={page1} pageCount={pageCount} onPageChange={setPage} />
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 12,
				}}
			>
				<label>Показывать по</label>
				<TablePaginationSelect
					// open={false}
					variant="standard"
					value={pageSize}
					defaultValue={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
				>
					{pageSizeOptions.map((option) => (
						<MenuItem
							sx={{padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
							key={option}
							value={option}
						>
							{option}
						</MenuItem>
					))}
				</TablePaginationSelect>
			</div>
		</Box>
	);
};

const HeaderCellRoot = styled('div', {
	shouldForwardProp: (prop) => prop !== 'hover',
})<{hover?: boolean}>`
	display: flex;
	gap: 5px;
	justify-content: start;
	align-items: center;
	width: 100%;
	height: 100%;
`;
const HeaderCell: React.FC<{
	notSorted?: boolean;
	fieldName: string;
	label: string;
	onClick: (item: [string, 'desc' | 'asc' | undefined][]) => void;
	direction?: 'asc' | 'desc';
}> = ({fieldName, label, notSorted, onClick: _onClick, direction}) => {
	const [isHover, setIsHover] = React.useState(false);
	let iconName: MyIconName = 'sortArrowsDown';
	if (direction === 'asc') {
		iconName = 'sortArrowsDown';
	} else if (direction === 'desc') {
		iconName = 'sortArrowsUp';
	}

	const onClick = () => {
		if (direction === 'asc') {
			_onClick([[fieldName, 'desc']]);
		} else if (direction === 'desc') {
			_onClick([[fieldName, undefined]]);
		} else {
			_onClick([[fieldName, 'asc']]);
		}
	};

	return (
		<HeaderCellRoot
			onMouseOver={!notSorted ? () => setIsHover(true) : undefined}
			onMouseLeave={!notSorted ? () => setIsHover(false) : undefined}
			// onClick={!notSorted ? onClick : undefined}
			onClick={!notSorted ? onClick : undefined}
			className={!notSorted ? (isHover ? 'hover' : '') : ''}
		>
			{label}
			{!notSorted && (
				<Icon2
					isNotIcon
					sx={{
						opacity: direction ? 1 : isHover ? 0.5 : 0,
					}}
					color="icon2"
					size={18}
					url={getIconUrlByName(iconName)}
				/>
			)}
		</HeaderCellRoot>
	);
};

const StyledDataGrid = styled(DataGrid)(({theme}) => {
	const colors = (theme as skyAllianceMUITheme).colors;
	return {
		border: 'none',
		backgroundColor: 'transparent',

		'& .MuiDataGrid-main': {
			borderTopLeftRadius: '12px',
			borderTopRightRadius: '12px',
		},
		'& .MuiDataGrid-columnHeader:focus': {
			outline: 'none',
		},
		'& .MuiDataGrid-columnSeparator': {
			display: 'none',
		},
		'& .MuiDataGrid-topContainer': {
			backgroundColor: colors.base6,
		},
		'& .MuiDataGrid-columnHeader': {
			backgroundColor: colors.base6,
			color: colors.icon2,
			fontWeight: 600,
			fontSize: 15,
			cursor: 'pointer',

			border: 'none!important',
			transition: 'all 0.4s ease',
		},
		'& .MuiDataGrid-columnHeader:hover': {
			backgroundColor: colors.base4,
		},
		'& .MuiDataGrid-row--borderBottom ': {
			border: 'none',
			borderBottom: `1px solid ${colors.base6}!important`,
			// backgroundColor: `${colors.base1}!important`, //  todo '--DataGrid-container': 'rgba(236, 239, 244, 1)',
		},
		'& .MuiDataGrid-scrollbarFiller, & .MuiDataGrid-filler': {
			display: 'none',
		},
		'& .MuiDataGrid-row, & .MuiDataGrid-row.MuiDataGrid-row--firstVisible': {
			cursor: 'pointer',
			'--rowBorderColor': `${colors.base4} !important`,
			backgroundColor: colors.base1,
			'--height': '50px',
			'&:hover': {
				backgroundColor: colors.base5,
			},

			'&.MuiDataGrid-row--lastVisible': {
				borderBottom: '1px solid var(--rowBorderColor)',
			},
		},
		'& .MuiDataGrid-cell': {
			'&:has(.MuiSkeleton-root)': {
				paddingInline: 0,
			},
			'&:focus, &:focus-within': {
				outline: 'none',
			},
		},
		'& .MuiDataGrid-footerContainer': {
			border: 'none',
		},

		'& .Styled-MuiPaginationItem': {
			border: 'none',
			backgroundColor: colors.base1,
			color: 'black',
		},
		'& .Styled-MuiPaginationItem.MuiPaginationItem-root.Mui-selected': {
			color: colors.primary1,
			border: 'none',
			backgroundColor: colors.base1,
		},

		'& .MuiDataGrid-columnHeaderTitle': {
			color: colors.icon2,
			fontWeight: 600,
			lineHeight: '18px',
		},
		'& .MuiDataGrid-columnHeaderTitleContainer': {
			justifyContent: 'stretch',
			alignItems: 'stretch',
			flex: 1,
		},

		'& .MuiDataGrid-columnHeaderTitleContainerContent': {
			justifyContent: 'stretch',
			alignItems: 'stretch',
			flex: 1,
		},
	};
});

const getEmptyRows = (count: number) => {
	// @ts-expect-error toremove
	const emptyRow = createData(999, null, '', '', '', '');

	return new Array(count).fill(null).map((_, i) => {
		return {...emptyRow, id: emptyRow.id + i};
	});
};

const ColumnAutosizing = () => {
	const apiRef = useGridApiRef();
	// const data = useData(100);

	const {tableStore} = useCustomStore();
	const {filteredRows, getFilteredRowsIsLoading, sorting, setSorting} = tableStore;

	const sizablefilteredRows = React.useMemo(() => {
		const isNeed = filteredRows.length < 5;
		console.log('isNeed', isNeed, 'filteredRows', filteredRows.length);
		const res = isNeed ? [...filteredRows, ...getEmptyRows(5 - (filteredRows.length || 0))] : filteredRows;
		return res;
	}, [filteredRows]);
	// React.useEffect(() => {
	// 	fetchByFiltersForce();
	// }, []);

	React.useEffect(() => {
		if (!apiRef.current) {
			return;
		}

		apiRef.current.autosizeColumns({expand: true}).catch(() => {});
	}, [apiRef]);

	const headerKeys = React.useMemo(() => {
		if (getFilteredRowsIsLoading || !filteredRows || !filteredRows?.length || !filteredRows[0]) {
			return [];
		}
		return Object.keys(filteredRows?.[0]);
	}, [filteredRows, getFilteredRowsIsLoading]);

	const [isWithReject, setIsWithReject] = React.useState(true);
	const columns = React.useMemo(() => {
		if (getFilteredRowsIsLoading || !filteredRows || !filteredRows?.length || !filteredRows[0]) {
			const loading: DataGridProps['columns'] = [
				{
					field: 'skeleton',
					headerName: '',
					resizable: false,
					sortable: false,
					flex: 1,
					renderCell: CustomizeCellContent,
				},
			];
			return loading;
		}
		const keys = Object.keys(filteredRows?.[0]);
		if (isWithReject) {
			keys.push('rejectButton');
		}
		return keys
			.filter((key) => key !== 'id')
			.map((key) => {
				console.log(key);
				// @ts-expect-error toremove
				let label = labelDictionary?.[key] as string | undefined;
				label = label !== undefined ? label : key;
				const item: DataGridProps['columns'][0] = {
					resizable: key !== 'rejectButton',
					// sortable: key !== 'rejectButton',
					sortable: false,
					flex: 1,
					// sortComparator: descendingComparator,
					renderCell: CustomizeCellContent,
					renderHeader: (params) => {
						const field = params.field;
						const direction = sorting ? sorting?.find((item) => item[0] === field) : [];

						return (
							<HeaderCell
								notSorted={key === 'rejectButton'}
								onClick={setSorting}
								fieldName={key}
								label={label}
								direction={direction?.[1]}
							/>
						);
					},
					field: key,
					// headerName: labelDictionary[key as keyof Data],
				};
				return item;
			});
	}, [filteredRows, sorting, getFilteredRowsIsLoading, isWithReject]);

	const router = useRouter();

	return (
		<div style={{width: '100%'}}>
			<div style={{width: '100%'}}>
				<StyledDataGrid
					onRowClick={({...data}, e) => {
						const row = data.row as Data;
						// console.log('row row', data, e);

						router.push(`/application/${row.appNumber}`).catch(() => {});
					}}
					apiRef={apiRef}
					density="standard"
					sortingOrder={['desc', 'asc']}
					disableColumnResize={true}
					disableColumnFilter={true}
					disableColumnMenu={true}
					disableColumnSelector={true}
					disableDensitySelector={true}
					disableEval={true}
					disableRowSelectionOnClick={true}
					slots={{
						columnSortedDescendingIcon: () => (
							<Icon2 isNotIcon size={16} url={getIconUrlByName('sortArrowsDown')} />
						),
						columnSortedAscendingIcon: () => (
							<Icon2 isNotIcon size={16} url={getIconUrlByName('sortArrowsUp')} />
						),
						columnUnsortedIcon: () => (
							<Icon2 isNotIcon sx={{opacity: 0.55}} size={16} url={getIconUrlByName('sortArrowsDown')} />
						),
						// pagination: CustomPagination,
						// pagination: Pagination,
						footer: () => (
							<CustomFooterStatusComponent
								disabled={getFilteredRowsIsLoading}
								pageSizeOptions={[5, 10, 25]}
							/>
						), //CustomFooterStatusComponent,

						// columnUnsortedIcon: UnsortedIcon,
					}}
					// columns={[
					// 		{flex: 1, field: 'id', headerName: 'Brand ID'},
					// 		{flex: 1, field: 'brand', headerName: 'Brand name'},
					// 		{flex: 1, field: 'rep', headerName: 'Representative'},
					// 		{
					// 			flex: 1,

					// 			field: 'rating',
					// 			headerName: 'Rating',
					// 			renderCell: CustomizeCellContent,
					// 			// renderHeader: CustomizeCellContent,
					// 			display: 'flex' as const,
					// 			sortComparator: (a,) => 1,
					// 		},
					// 	]}
					slotProps={{
						cell: {
							style: {
								display: 'flex',
								alignItems: 'center',
							},
						},
						row: {
							style: {
								// '--height': '51px',
							},
						},
					}}
					columns={columns}
					// rows={[
					// 	{id: '1', key: 'skeleton'},
					// 	{id: '2', key: 'skeleton'},
					// ]}
					loading={getFilteredRowsIsLoading}
					// @ts-expect-error toremove
					rows={getFilteredRowsIsLoading ? LoadingSkeletons : sizablefilteredRows}
					// rows={LoadingSkeletons}
					initialState={{
						pagination: {paginationModel: {pageSize: 5}},
					}}
					pageSizeOptions={[5, 10, 25]}
				/>
			</div>
		</div>
	);
};

const CTable = () => {
	return (
		<>
			<Filters />
			<ColumnAutosizing />
		</>
	);
};
export {CTable};
