import * as React from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {skyAllianceMUITheme} from '@/styles/theme';
import {getThemedColor} from '@/styles/theme/colors';
import {MenuItem, PaginationItem, Select} from '@mui/material';
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

import {getIconUrlByName} from '@/shared/icons/icons-data';

import {Icon2} from '../icon';
import {StatusBadge, StatusTypes} from '../status-badge/badge-status';
import Filters from './filters/filters';

interface Data {
	id: number;
	createdAt: number;
	appNumber: string;
	status: StatusTypes;
	type: string;
	executor: string;
}

function createData(
	id: number,
	createdAt: number,
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

const rows: Data[] = [
	createData(1, 1693573214000, 'APP001', 'analyze', 'Task', 'John Doe'),
	createData(2, 1693673214000, 'APP002', 'in-work', 'Bug', 'Jane Smith'),
	createData(3, 1693773214000, 'APP003', 'done', 'Feature', 'Alice Johnson'),
	createData(4, 1693873214000, 'APP004', 'specified', 'Improvement', 'Bob Brown'),
	createData(5, 1693973214000, 'APP005', 'rejected', 'Task', 'Charlie Davis'),
	createData(6, 1694073214000, 'APP006', 'waited', 'Bug', 'Emily White'),
	createData(7, 1694173214000, 'APP007', 'draft', 'Feature', 'Frank Wilson'),
	createData(8, 1694273214000, 'APP008', 'analyze', 'Improvement', 'Grace Lee'),
	createData(9, 1694373214000, 'APP009', 'in-work', 'Task', 'Hank Miller'),
	createData(10, 1694473214000, 'APP010', 'done', 'Bug', 'Ivy Garcia'),
];
const labelDictionary: Record<keyof Data, string> = {
	id: 'ID',
	appNumber: 'Номер заявки',
	createdAt: 'Дата создания',
	status: 'Статус',
	type: 'Тип',
	executor: 'Исполнитель',
};

const labelDictionaryReversed = Object.fromEntries(Object.entries(labelDictionary).map(([key, value]) => [value, key]));

const CustomizeCellContent: (
	params: GridRenderCellParams<Data, unknown, unknown, GridTreeNodeWithRender>,
) => React.ReactNode = (params) => {
	// console.log('props', params);
	// return null;

	const value = params.value as boolean | number | string | null;
	const key = params.field;
	let content = null;
	// const id = rowData.id;
	if (key === 'id') return null;
	else {
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
				content = <div>{value}</div>;
				break;
			case 'executor':
				content = <div>{value}</div>;
				break;
			case 'id':
				content = null;
				break;
			case 'rejectButton':
				if (params.row.status === 'rejected' || params.row.status === 'done') content = null;
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
				content = value;
				break;
		}
		return content;
	}
};

const descendingComparator: DataGridProps['columns'][0]['sortComparator'] = (a, b, cell1, cell2) => {
	// console.log(a, b, cell1, cell2);
	if (cell1.field === 'status' || typeof a === 'string') {
		return -1 * (a as string).localeCompare(b as string);
	}

	return a - b > 0 ? -1 : 1;
};
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
					return (
						<PaginationItem
							className="Styled-MuiPaginationItem"
							// sx={{
							// 	border: 'none',
							// 	backgroundColor: getThemedColor('base4'),
							// 	color: 'black',

							// 	'&.MuiPaginationItem-root.Mui-selected': {
							// 		color: getThemedColor('primary1'),
							// 		border: 'none',
							// 		backgroundColor: getThemedColor('base4'),
							// 	},
							// }}
							{...item}
						/>
					);
				}}
				onChange={(e, newPage) => {
					onPageChange(newPage - 1);
				}}
			/>
		</>
	);
};

// const CustomPagination = (props: any) => {
// 	return (
// 		<TablePagination
// 			// labelDisplayedRows={({from, to, count}) => `${from}-${to} из ${count}`}
// 			labelRowsPerPage="Показывать по: "
// 			labelDisplayedRows={() => ''}
// 			ActionsComponent={Pagination}
// 			{...props}
// 		/>
// 	);
// };
const CustomFooterStatusComponent = (
	props: NonNullable<GridSlotsComponentsProps['footer']> & {pageSizeOptions: number[]},
) => {
	const apiRef = useGridApiContext();
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);
	const setPageSize = apiRef.current.setPageSize;
	const setPage = apiRef.current.setPage;
	const page1 = apiRef.current.state.pagination.paginationModel.page;
	console.log('apiRef.current', apiRef.current);
	const pageSize = apiRef.current.state.pagination.paginationModel.pageSize;
	const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
	const pageCount2 = useGridSelector(apiRef, gridPageCountSelector);
	const pageCount3 = useGridSelector(apiRef, gridPageSizeSelector);
	const pageCountmeta = useGridSelector(apiRef, gridPaginationMetaSelector);
	console.log('page1', pageCount, page1, pageSize, pageCount2, pageCount3);
	console.log('pageCountmeta', pageCountmeta);

	const {pageSizeOptions} = props;

	return (
		<Box sx={{p: 1, display: 'flex', justifyContent: 'space-between'}}>
			<Pagination page={page1} pageCount={pageCount} onPageChange={setPage} />
			<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
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
						<MenuItem sx={{padding: 0}} key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</TablePaginationSelect>
			</div>
		</Box>
	);
};
const ColumnSortedDescendingIcon = ({...props}) => (
	<Icon2 color="icon2" url={getIconUrlByName('sortArrows')} size={20} />
);

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

			border: 'none!important',
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
		},
		'& .MuiDataGrid-cell': {
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
			gap: 3,
		},
	};
});

const ColumnAutosizing = () => {
	const apiRef = useGridApiRef();
	// const data = useData(100);

	React.useEffect(() => {
		if (!apiRef.current) {
			return;
		}

		apiRef.current.autosizeColumns({expand: true}).catch(() => {});
	}, [apiRef]);

	const [isWithReject, setIsWithReject] = React.useState(true);
	const columns = React.useMemo(() => {
		const keys = Object.keys(rows[0]);
		if (isWithReject) {
			keys.push('rejectButton');
		}
		return keys
			.filter((key) => key !== 'id')
			.map((key) => {
				const item: DataGridProps['columns'][0] = {
					resizable: key !== 'rejectButton',
					sortable: key !== 'rejectButton',
					flex: 1,
					sortComparator: descendingComparator,
					renderCell: CustomizeCellContent,
					// renderHeader: CustomizeCellContent,
					field: key,
					headerName: labelDictionary[key as keyof Data],
				};
				return item;
			});
	}, [isWithReject]);

	const router = useRouter();

	return (
		<div style={{width: '100%'}}>
			<div style={{width: '100%'}}>
				<StyledDataGrid
					onRowClick={({...data}, e) => {
						const row = data.row as Data;
						console.log('row row', data, e);

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
						footer: () => <CustomFooterStatusComponent pageSizeOptions={[5, 10, 25]} />, //CustomFooterStatusComponent,

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
								'--height': '51px',
							},
						},
					}}
					columns={columns}
					rows={rows}
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
			<ColumnAutosizing
			// CellContentCustomize={(key, data) => CustomizeCellContent(key, data)}
			// HeaderCellContentCustomize={(id, data) => CustomizeCellContent('id', data, true)}
			/>
		</>
	);
};
export {CTable};
