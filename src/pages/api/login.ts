// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {User} from '@/state/types';
import type {NextApiRequest, NextApiResponse} from 'next';

type LoginResponse = {
	token: string;
	user: User;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<LoginResponse>) {
	res.status(200).json({
		token: 'token',
		user: {
			id: 1,
			email: 'email',
			name: 'name',
			role: 'default',
			avatar: '/img/icons/user-02.svg',
		},
	});
}
