// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {User} from '@/state/types';
import type {NextApiRequest, NextApiResponse} from 'next';

import {StatusTypes} from '@/shared/ui/status-badge/badge-status';

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

let i = 0;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data[]>) {
	const params = req.query;
	// let data = [createData(Math.random(), 1694473214000, 'APP010', 'done', 'Bug', 'Ivy Garcia')];
	let data = rows;
	// if (i % 2 === 0) {
	// 	data = [...rows].reverse();
	// } else {
	// }
	// i++;
	console.log(i, '--', data[0].id);
	res.status(200).json(data);
}
