// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';

const rows: {key: string; name: string}[] = [
	{key: 'Иван Иванов', name: 'Иван Иванов'},
	{key: 'Пётр Петров', name: 'Пётр Петров'},
	{key: 'Сергей Сергеев', name: 'Сергей Сергеев'},
	{key: 'Николай Николаев', name: 'Николай Николаев'},
];

export default function handler(req: NextApiRequest, res: NextApiResponse<{key: string; name: string}[]>) {
	res.status(200).json(rows);
}
