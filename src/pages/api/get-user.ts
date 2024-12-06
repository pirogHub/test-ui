// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {User} from '@/state/types';
import type {NextApiRequest, NextApiResponse} from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<User>) {
	res.status(200).json({
		id: 1,
		email: 'email',
		name: 'name',
		role: 'default',
		avatar: '/img/icons/user-02.svg',
	});
}
