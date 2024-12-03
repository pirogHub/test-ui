import * as React from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FilterListIcon from '@mui/icons-material/FilterList';
import {MenuItem, PaginationItem, Select} from '@mui/material';
import {styled} from '@mui/material';
import Box from '@mui/material/Box';
// import * as React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import MuiPagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import {TablePaginationProps} from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {
	DataGrid,
	GridPagination,
	GridRenderCellParams,
	GridRowParams,
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
import {useGridPagination} from '@mui/x-data-grid/internals';
import {useRouter} from 'next/router';

import {getIconUrlByName} from '@/shared/icons/icons-data';

import {Icon2} from '../icon';
// import {randomRating, randomTraderName} from '@mui/x-data-grid-generator';
import {StatusBadge, StatusTypes} from '../status-badge/badge-status';

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
	params: GridRenderCellParams<Data, any, any, GridTreeNodeWithRender>,
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
						// <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
						<ButtonStyled
							onClick={(e) => {
								e.stopPropagation();
							}}
							label="Отменить"
							view="outline"
						/>
						// </div>
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

function descendingComparator<T>(a: T, b: T, cell1, cell2) {
	// console.log(a, b, cell1, cell2);
	if (cell1.field === 'status' || typeof a === 'string') {
		return a.localeCompare(b);
	}

	return a - b > 0 ? 1 : -1;
}
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
})({
	// color: 'inherit',
	// fontSize: 'inherit',
	// flexShrink: 0,
	'&::after, &::before': {
		// content: "''",
		display: 'none',
	},
	border: '1px solid rgba(234, 234, 234, 1)',
	borderRadius: '8px',
	// padding: '0 12px',
	backgroundColor: '#fff',
	boxSizing: 'border-box',

	'& .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input ': {
		padding: '4px 22px 4px 12px',
	},

	'& svg': {
		right: '4px',
	},

	// marginRight: 32,
	// marginLeft: 8,
	// [`& .${tablePaginationClasses.select}`]: {
	// 	paddingLeft: 8,
	// 	paddingRight: 24,
	// 	textAlign: 'right',
	// 	textAlignLast: 'right', // Align <select> on Chrome.
	// },
});
const Pagination = ({
	page,
	onPageChange,
	pageCount,
}: Pick<TablePaginationProps, 'page' | 'onPageChange'> & {pageCount: number}) => {
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
							sx={{
								border: 'none',
								backgroundColor: '#fff',
								color: 'black',

								'&.MuiPaginationItem-root.Mui-selected': {
									color: 'rgba(46, 172, 251, 1)',
									border: 'none',
									backgroundColor: '#fff',
								},
							}}
							{...item}
						/>
					);
				}}
				onChange={(event, newPage) => {
					onPageChange(newPage - 1);
				}}
			/>
		</>
	);
};

const CustomPagination = (props: any) => {
	return (
		<TablePagination
			// labelDisplayedRows={({from, to, count}) => `${from}-${to} из ${count}`}
			labelRowsPerPage="Показывать по: "
			labelDisplayedRows={() => ''}
			ActionsComponent={Pagination}
			{...props}
		/>
	);
};
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
			<Pagination page={page1} pageCount={pageCount} onPageChange={(page) => setPage(page)} />
			<div style={{display: 'flex', alignItems: 'center', gap: 12}}>
				<label>Показывать по</label>
				<TablePaginationSelect
					// open={false}
					variant="standard"
					value={pageSize}
					defaultValue={pageSize}
					onChange={(e) => {
						// console.log(e.target.value);
						setPageSize(e.target.value);
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
	<Icon2 color="rgba(164, 165, 177, 1)" url={getIconUrlByName('sortArrows')} size={20} />
);

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
				return {
					resizable: key !== 'rejectButton',
					sortable: key !== 'rejectButton',
					flex: 1,
					sortComparator: descendingComparator,
					renderCell: CustomizeCellContent,
					// renderHeader: CustomizeCellContent,
					field: key,
					headerName: labelDictionary[key as keyof Data],
				};
			});
	}, [isWithReject]);

	const router = useRouter();

	return (
		<div style={{width: '100%'}}>
			<div style={{width: '100%'}}>
				<DataGrid
					onRowClick={({...row}, e) => {
						// console.log('row row', row, e);
						console.log('row row', row, e);

						router.push(`/application/${row.row.appNumber}`);
					}}
					apiRef={apiRef}
					density="standard"
					sx={{
						border: 'none',
						// border: '1px solid red',
						backgroundColor: 'transparent',
						// '& .MuiDataGrid-menuIconButton': {
						// 	display: 'none',
						// },
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
							backgroundColor: 'rgba(236, 239, 244, 1)',
						},
						'& .MuiDataGrid-columnHeader': {
							backgroundColor: 'rgba(236, 239, 244, 1)',
							color: 'rgba(164, 165, 177, 1)',
							fontWeight: 600,
							fontSize: 15,
							// lineHeight: 18,
							// padding: '0 20px',
							// minHeight: 50,
							// boxSizing: 'content-box',
							border: 'none!important',
						},
						'& .MuiDataGrid-row--borderBottom ': {
							border: 'none',
							borderBottom: '1px solid rgba(236, 239, 244, 1)!important',
							backgroundColor: 'rgba(236, 239, 244, 1)!important', //  todo '--DataGrid-container': 'rgba(236, 239, 244, 1)',
						},
						'& .MuiDataGrid-scrollbarFiller, & .MuiDataGrid-filler': {
							display: 'none',
						},
						'& .MuiDataGrid-row': {
							cursor: 'pointer',
							'--rowBorderColor': 'rgba(234, 234, 234, 1)',
							backgroundColor: '#fff',
							'--height': '50px',
							'&:hover': {
								backgroundColor: 'rgba(248, 248, 248, 1)',
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
					}}
					sortingOrder={['desc', 'asc']}
					disableColumnResize={true}
					disableColumnFilter={true}
					disableColumnMenu={true}
					disableColumnSelector={true}
					disableDensitySelector={true}
					disableEval={true}
					disableRowSelectionOnClick={true}
					slots={{
						columnSortedDescendingIcon: ColumnSortedDescendingIcon,
						columnSortedAscendingIcon: ColumnSortedDescendingIcon,
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
								// justifyContent: 'center',
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
			<ColumnAutosizing
			// CellContentCustomize={(key, data) => CustomizeCellContent(key, data)}
			// HeaderCellContentCustomize={(id, data) => CustomizeCellContent('id', data, true)}
			/>
		</>
	);
};
export {CTable};
