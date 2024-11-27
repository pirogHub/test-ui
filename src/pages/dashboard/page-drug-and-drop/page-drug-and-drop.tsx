import React from 'react';

import {Header} from '@/components/header';

import {DrugAndDrop} from '@/shared/ui/drug-and-drop/drug-and-drop';
import {InputField} from '@/shared/ui/input';

const PageDrugAndDrop = () => {
	return (
		<div>
			<Header />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '10px',
				}}
			>
				<DrugAndDrop />
			</div>
		</div>
	);
};

export default PageDrugAndDrop;
