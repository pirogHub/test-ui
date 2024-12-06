/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {DataGridProps} from '@mui/x-data-grid';
import type {NextApiRequest, NextApiResponse} from 'next';

import {StatusDataMap, StatusTypes} from '@/shared/ui/status-badge/badge-status';

const dictionaryType = {
	inner: 'Внутренний',
	outer: 'Внешний',
};

const dicts = {
	status: Object.entries(StatusDataMap).reduce((acc, [key, item]) => {
		return {
			...acc,
			[key]: item.label,
		};
	}, {}),
	type: dictionaryType,
};

const descendingComparator: DataGridProps['columns'][0]['sortComparator'] = (a, b, cell1, cell2) => {
	// console.log(a, b, cell1, cell2);
	if (cell1.field === 'status' || cell1.field === 'type' || typeof a === 'string') {
		let translateA = a;
		let translateB = b;
		if (cell1.field === 'status' || cell1.field === 'type') {
			// @ts-expect-error toremove
			translateA = dicts[cell1.field][a] || '';
			// @ts-expect-error toremove
			translateB = dicts[cell1.field][b] || '';
		}

		return -1 * (translateA as string).localeCompare(translateB as string);
	}

	return a - b > 0 ? -1 : 1;
};

function createData(
	id: number,
	createdAt: number,
	appNumber: string,
	status: StatusTypes,
	type: string,
	executor: string,
) {
	return {
		id,
		createdAt,
		appNumber,
		status,
		type,
		executor,
	};
}
type Data = ReturnType<typeof createData>;

const rows: Data[] = [
	createData(1, 1613573214000, 'APP001', 'analyze', 'inner', 'Иван Иванов'),
	createData(2, 1623673214000, 'APP002', 'in-work', 'outer', 'Пётр Петров'),
	createData(3, 1633773214000, 'APP003', 'done', 'inner', 'Сергей Сергеев'),
	createData(4, 1643873214000, 'APP004', 'specified', 'outer', 'Иван Иванов'),
	createData(5, 1653973214000, 'APP005', 'rejected', 'inner', 'Иван Иванов'),
	createData(6, 1664073214000, 'APP006', 'waited', 'outer', 'Пётр Петров'),
	createData(7, 1674173214000, 'APP007', 'draft', 'inner', 'Сергей Сергеев'),
	createData(8, 1684273214000, 'APP008', 'analyze', 'outer', 'Сергей Сергеев'),
	createData(9, 1694373214000, 'APP009', 'in-work', 'inner', 'Николай Николаев'),
	createData(10, 1704473214000, 'APP010', 'done', 'outer', 'Николай Николаев'),
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data[]>) {
	const params = req.query;

	// @ts-expect-error toremove
	const parsedParams = Object.fromEntries(Object.entries(params).map(([key, value]) => [key, JSON.parse(value)]));

	const filters = parsedParams.filters;
	const sorting = parsedParams.sorting;
	console.log(parsedParams);

	// let data = [createData(Math.random(), 1694473214000, 'APP010', 'done', 'Bug', 'Ivy Garcia')];
	let data = rows;
	if (filters) {
		console.log('start filtering');
		const filterKeys = Object.keys(filters);
		console.log('filterKeys', filterKeys);

		const notEmptyFilterArr = Object.entries(filters).reduce((acc, [key, val]) => {
			// @ts-expect-error toremove
			if (val && val?.length) {
				// @ts-expect-error toremove
				acc.push([key, val]);
			}
			return acc;
		}, []);
		console.log('notEmptyFilterArr', notEmptyFilterArr);
		if (notEmptyFilterArr.length) {
			data = rows.filter((row) => {
				let isEnabled = true;
				// @ts-expect-error toremove
				notEmptyFilterArr?.forEach(([key, val]) => {
					if (Object.hasOwn(row, key)) {
						switch (key) {
							case 'status':
							case 'type':
							case 'executor':
								// @ts-expect-error toremove
								if (!val.includes(row[key])) isEnabled = false;
								break;
							default:
								break;
						}
					}
				});
				return isEnabled;
			});
		}
	}
	console.log('data', data[0]);

	if (sorting && sorting?.[0]?.[0] && sorting?.[0]?.[1]) {
		const field = sorting[0][0];
		const direction = sorting[0][1];
		// @ts-expect-error toremove
		const isSafeSort = data[0]?.[field];
		console.log(field, direction, isSafeSort);
		if (isSafeSort) {
			console.log('start sorting');

			data = [...data].sort((a, b) => {
				// @ts-expect-error toremove
				return descendingComparator(a[field], b[field], {field}, b);
			});

			if (direction === 'desc') {
				data = [...data].reverse();
			}
		}
	}
	// if (i % 2 === 0) {
	// 	data = [...rows].reverse();
	// } else {
	// }
	// i++;
	res.status(200).json(data);
}
