// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';

type ExecutorType = {id: number; key: string; name: string};
const rows: ExecutorType[] = [
	{id: 1, key: 'Иван Иванов', name: 'Иван Иванов'},
	{id: 2, key: 'Пётр Петров', name: 'Пётр Петров'},
	{id: 3, key: 'Сергей Сергеев', name: 'Сергей Сергеев'},
	{id: 4, key: 'Николай Николаев', name: 'Николай Николаев'},
];

export default function handler(req: NextApiRequest, res: NextApiResponse<ExecutorType[]>) {
	res.status(200).json(rows);
}
