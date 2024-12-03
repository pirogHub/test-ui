// import * as React from 'react';

// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import Box from '@mui/material/Box';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import IconButton from '@mui/material/IconButton';
// import Paper from '@mui/material/Paper';
// import Switch from '@mui/material/Switch';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Tooltip from '@mui/material/Tooltip';
// import Typography from '@mui/material/Typography';
// import {alpha} from '@mui/material/styles';

// import {StatusBadge, StatusTypes} from '../status-badge/badge-status';

// interface Data {
// 	id: number;
// 	createdAt: number;
// 	appNumber: string;
// 	status: StatusTypes;
// 	type: string;
// 	executor: string;
// }

// function createData(
// 	id: number,
// 	createdAt: number,
// 	appNumber: string,
// 	status: StatusTypes,
// 	type: string,
// 	executor: string,
// ): Data {
// 	return {
// 		id,
// 		createdAt,
// 		appNumber,
// 		status,
// 		type,
// 		executor,
// 	};
// }

// const rows: Data[] = [
// 	createData(1, 1693573214000, 'APP001', 'analyze', 'Task', 'John Doe'),
// 	createData(2, 1693673214000, 'APP002', 'in-work', 'Bug', 'Jane Smith'),
// 	createData(3, 1693773214000, 'APP003', 'done', 'Feature', 'Alice Johnson'),
// 	createData(4, 1693873214000, 'APP004', 'specified', 'Improvement', 'Bob Brown'),
// 	createData(5, 1693973214000, 'APP005', 'rejected', 'Task', 'Charlie Davis'),
// 	createData(6, 1694073214000, 'APP006', 'waited', 'Bug', 'Emily White'),
// 	createData(7, 1694173214000, 'APP007', 'draft', 'Feature', 'Frank Wilson'),
// 	createData(8, 1694273214000, 'APP008', 'analyze', 'Improvement', 'Grace Lee'),
// 	createData(9, 1694373214000, 'APP009', 'in-work', 'Task', 'Hank Miller'),
// 	createData(10, 1694473214000, 'APP010', 'done', 'Bug', 'Ivy Garcia'),
// ];

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
// 	if (b[orderBy] < a[orderBy]) {
// 		return -1;
// 	}
// 	if (b[orderBy] > a[orderBy]) {
// 		return 1;
// 	}
// 	return 0;
// }

// type Order = 'asc' | 'desc';

// function getComparator<Key extends keyof Data>(
// 	order: Order,
// 	orderBy: Key,
// ): (a: {[key in Key]: number | string}, b: {[key in Key]: number | string}) => number {
// 	return order === 'desc'
// 		? (a, b) => descendingComparator(a, b, orderBy)
// 		: (a, b) => -descendingComparator(a, b, orderBy);
// }

// interface HeadCell {
// 	id: keyof Data;
// 	label: string;
// }

// const labelDictionary: Record<keyof Data, string> = {
// 	id: 'ID',
// 	appNumber: 'Номер заявки',
// 	createdAt: 'Дата создания',
// 	status: 'Статус',
// 	type: 'Тип',
// 	executor: 'Исполнитель',
// };

// const headCells: readonly HeadCell[] = (Object.keys(rows[0]) as (keyof Data)[]).map((key) => {
// 	return {
// 		id: key,
// 		label: labelDictionary[key],
// 	};
// });

// interface EnhancedTableProps {
// 	numSelected: number;
// 	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
// 	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
// 	order: Order;
// 	orderBy: string;
// 	rowCount: number;
// }

// const CustomizeCellContent = <T extends keyof Data>(key: T, rowData: Data, onlyHeaderLabel?: boolean) => {
// 	const value = rowData[key];
// 	let content = null;
// 	// const id = rowData.id;
// 	if (key === 'id') return null;
// 	if (onlyHeaderLabel) return labelDictionary[key];
// 	else {
// 		switch (key) {
// 			case 'createdAt':
// 				content = new Date(value).toLocaleString();
// 				break;
// 			case 'appNumber':
// 				content = <div>{value}</div>;
// 				break;
// 			case 'status':
// 				content = <StatusBadge status={value as StatusTypes} />;
// 				break;
// 			case 'type':
// 				content = <div>{value}</div>;
// 				break;
// 			case 'executor':
// 				content = <div>{value}</div>;
// 				break;
// 			case 'id':
// 				content = null;
// 				break;
// 			default:
// 				content = value;
// 				break;
// 		}
// 		return content;
// 	}
// };

// const EnhancedTableHead = (props: EnhancedTableProps) => {
// 	const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
// 	const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
// 		onRequestSort(event, property);
// 	};

// 	return (
// 		<TableHead>
// 			<TableRow
// 				sx={{
// 					display: 'grid',
// 					gridTemplateColumns: `repeat(${headCells.length - 1}, minmax(100px, 1fr))`, // 100px минимум, равномерное распределение
// 					width: '100%',
// 					border: '1px solid #ccc',
// 					borderRadius: '4px',
// 					overflow: 'hidden',
// 				}}
// 			>
// 				{(Object.keys(rows[0]) as (keyof Data)[]).map((headCell) => {
// 					const content = CustomizeCellContent(headCell, rows[0], true);
// 					return content ? (
// 						<TableCell
// 							sx={{
// 								border: '1px solid black',
// 								minWidth: '100px', // Минимальная ширина
// 								overflow: 'hidden',
// 								textOverflow: 'ellipsis',
// 								whiteSpace: 'nowrap',
// 							}}
// 							key={headCell}
// 							sortDirection={orderBy === headCell ? order : false}
// 						>
// 							<TableSortLabel
// 								active={orderBy === headCell}
// 								direction={orderBy === headCell ? order : 'asc'}
// 								onClick={createSortHandler(headCell)}
// 							>
// 								{content}
// 							</TableSortLabel>
// 						</TableCell>
// 					) : null;
// 				})}
// 			</TableRow>
// 		</TableHead>
// 	);
// };
// interface EnhancedTableToolbarProps {
// 	numSelected: number;
// }
// const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
// 	const {numSelected} = props;
// 	return (
// 		<Toolbar
// 			sx={[
// 				{
// 					pl: {sm: 2},
// 					pr: {xs: 1, sm: 1},
// 				},
// 				numSelected > 0 && {
// 					bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
// 				},
// 			]}
// 		>
// 			{numSelected > 0 ? (
// 				<Typography sx={{flex: '1 1 100%'}} color="inherit" variant="subtitle1" component="div">
// 					{numSelected} selected
// 				</Typography>
// 			) : (
// 				<Typography sx={{flex: '1 1 100%'}} variant="h6" id="tableTitle" component="div">
// 					Nutrition
// 				</Typography>
// 			)}
// 			{numSelected > 0 ? (
// 				<Tooltip title="Delete">
// 					<IconButton>
// 						<DeleteIcon />
// 					</IconButton>
// 				</Tooltip>
// 			) : (
// 				<Tooltip title="Filter list">
// 					<IconButton>
// 						<FilterListIcon />
// 					</IconButton>
// 				</Tooltip>
// 			)}
// 		</Toolbar>
// 	);
// };
// // const EnhancedTable: React.FC = <Data extends {id: string}>({
// const EnhancedTable: React.FC = ({
// 	CellContentCustomize,
// 	HeaderCellContentCustomise,
// }: {
// 	CellContentCustomize?: <CData>(key: keyof CData, data: CData) => React.ReactNode;
// 	HeaderCellContentCustomise?: <CData>(key: keyof CData, data: CData) => React.ReactNode;
// }) => {
// 	const [order, setOrder] = React.useState<Order>('asc');
// 	const [orderBy, setOrderBy] = React.useState<keyof Data>('createdAt');
// 	const [selected, setSelected] = React.useState<readonly number[]>([]);
// 	const [page, setPage] = React.useState(0);
// 	const [rowsPerPage, setRowsPerPage] = React.useState(5);

// 	const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
// 		const isAsc = orderBy === property && order === 'asc';
// 		setOrder(isAsc ? 'desc' : 'asc');
// 		setOrderBy(property);
// 	};

// 	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		if (event.target.checked) {
// 			const newSelected = rows.map((n) => n.id);
// 			setSelected(newSelected);
// 			return;
// 		}
// 		setSelected([]);
// 	};

// 	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
// 		const selectedIndex = selected.indexOf(id);
// 		let newSelected: readonly number[] = [];

// 		if (selectedIndex === -1) {
// 			newSelected = newSelected.concat(selected, id);
// 		} else if (selectedIndex === 0) {
// 			newSelected = newSelected.concat(selected.slice(1));
// 		} else if (selectedIndex === selected.length - 1) {
// 			newSelected = newSelected.concat(selected.slice(0, -1));
// 		} else if (selectedIndex > 0) {
// 			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
// 		}
// 		setSelected(newSelected);
// 	};

// 	const handleChangePage = (event: unknown, newPage: number) => {
// 		setPage(newPage);
// 	};

// 	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		setRowsPerPage(parseInt(event.target.value, 10));
// 		setPage(0);
// 	};

// 	// Avoid a layout jump when reaching the last page with empty rows.
// 	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

// 	const visibleRows = React.useMemo(
// 		() => [...rows].sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
// 		[order, orderBy, page, rowsPerPage],
// 	);

// 	return (
// 		<Box sx={{width: '100%'}}>
// 			<Paper sx={{width: '100%', mb: 2}}>
// 				<EnhancedTableToolbar numSelected={selected.length} />
// 				<TableContainer>
// 					<Table aria-labelledby="tableTitle" size={'medium'}>
// 						<EnhancedTableHead
// 							numSelected={selected.length}
// 							order={order}
// 							orderBy={orderBy}
// 							onSelectAllClick={handleSelectAllClick}
// 							onRequestSort={handleRequestSort}
// 							rowCount={rows.length}
// 						/>
// 						<TableBody>
// 							{visibleRows.map((row) => {
// 								const isItemSelected = selected.includes(row.id);
// 								const keys = Object.keys(row) as (keyof Data)[];
// 								return (
// 									<TableRow
// 										hover
// 										onClick={(event) => handleClick(event, row.id)}
// 										role="checkbox"
// 										aria-checked={isItemSelected}
// 										tabIndex={-1}
// 										key={row.id}
// 										selected={isItemSelected}
// 										sx={{
// 											display: 'grid',
// 											gridTemplateColumns: `repeat(${headCells.length - 1}, minmax(100px, 1fr))`, // 100px минимум, равномерное распределение
// 											width: '100%',
// 											border: '1px solid #ccc',
// 											overflow: 'hidden',
// 										}}
// 									>
// 										{keys.map((key) => {
// 											const content = CustomizeCellContent(key, row);
// 											return content ? (
// 												<TableCell
// 													sx={{
// 														border: '1px solid black',
// 														minWidth: '100px', // Минимальная ширина
// 														overflow: 'hidden',
// 														textOverflow: 'ellipsis',
// 														whiteSpace: 'nowrap',
// 													}}
// 													key={key}
// 												>
// 													{content}
// 												</TableCell>
// 											) : null;
// 										})}
// 									</TableRow>
// 								);
// 							})}
// 							{emptyRows > 0 && (
// 								<TableRow
// 									style={{
// 										height: 53 * emptyRows,
// 									}}
// 								>
// 									<TableCell colSpan={6} />
// 								</TableRow>
// 							)}
// 						</TableBody>
// 					</Table>
// 				</TableContainer>
// 				<TablePagination
// 					rowsPerPageOptions={[5, 10, 25]}
// 					component="div"
// 					count={rows.length}
// 					rowsPerPage={rowsPerPage}
// 					page={page}
// 					onPageChange={handleChangePage}
// 					onRowsPerPageChange={handleChangeRowsPerPage}
// 				/>
// 			</Paper>
// 		</Box>
// 	);
// };

// const CTable = () => {
// 	return (
// 		<>
// 			<EnhancedTable
// 			// CellContentCustomize={(key, data) => CustomizeCellContent(key, data)}
// 			// HeaderCellContentCustomize={(id, data) => CustomizeCellContent('id', data, true)}
// 			/>
// 		</>
// 	);
// };
// export {CTable};
