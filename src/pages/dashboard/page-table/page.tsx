import React from 'react';

import {Header} from '@/components/header';
import {SkyHeader} from '@/widgets';
import {styled} from '@mui/material';

import {CTable} from '@/shared/ui/table';

const Content = styled('div')`
	max-width: ${1344}px;
	margin: 0 auto;
`;

const PageDescription = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin: 40px 0;

	& h2 {
		font-size: 28px;
		font-weight: 600;
		line-height: 30.8px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: rgba(35, 31, 35, 1);
		margin: 0;
	}

	& p {
		//styleName: Body/Body 16 - Medium;
		margin: 0;
		font-family: Gilroy;
		font-size: 16px;
		font-weight: 500;
		line-height: 19.2px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;

		color: rgba(27, 31, 59, 0.4);
	}
`;

const Page = () => {
	return (
		<>
			{/* <Header /> */}
			<SkyHeader />
			<Content>
				<PageDescription>
					<h2>Мои заявки</h2>
					<p>Здесь отображаются все созданные вами заявки</p>
				</PageDescription>
				<CTable />
			</Content>
		</>
	);
};

export default Page;
