import React from 'react';

import {Header} from '@/components/header';

import {InputField} from '@/shared/ui/input';

const PageInputs = () => {
	return (
		<div>
			<Header />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '10px',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						display: 'flex',
						padding: '10px',
						flexDirection: 'column',
						gap: '10px',
						width: '100%',
						maxWidth: '600px',
					}}
				>
					<InputField label="Label" placeholder="Placeholder" />
					<InputField label="Label" placeholder="Placeholder" error="Error" />
					<InputField label="Label" placeholder="Placeholder" _isFocusedManual />
				</div>
			</div>
		</div>
	);
};

export default PageInputs;
