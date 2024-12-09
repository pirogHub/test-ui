import React from 'react';

import {Header} from '@/components/header';
import {SkyHeader} from '@/widgets';
import {FiltersCreator} from '@/widgets/filters/filters-creator';
import {styled} from '@mui/material';

import {CTable} from '@/shared/ui/table';
import {CreateProposal} from '@/shared/ui/table/create-proposal';

const Content = styled('div')`
	// TODO id=2358923467 занести в layout
	max-width: ${1344}px;
	margin: 0 auto;
`;

const PageDescription = styled('div')`
	// TODO id=2358923467 занести в layout
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

const ddd = [
	{id: 1, name: '1'},
	{id: 2, name: '2'},
	{id: 3, name: '3'},
	{id: 4, name: '4'},
	{id: 5, name: '5'},
];

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
				<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: '20px'}}>
					<div style={{display: 'flex', justifyContent: 'space-between'}}>
						<FiltersCreator />
						<CreateProposal />
					</div>
					<CTable />
					{/* {ddd.map(({id}) => {
						console.log(id);

						return <div key={id}>{id}</div>;
					})} */}
				</div>
			</Content>
		</>
	);
};

export default Page;
