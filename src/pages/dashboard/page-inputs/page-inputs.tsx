import React from 'react';

import {Header} from '@/components/header';
import {ButtonStyled} from '@/components/ui-kit/button/button-styled';

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
					{/* <ButtonStyled>Hello</ButtonStyled>
					<ButtonStyled active>Hello</ButtonStyled>
					<ButtonStyled hover>Hello</ButtonStyled>
					<ButtonStyled disabled>Hello</ButtonStyled>
					<ButtonStyled size="xl">Hello</ButtonStyled> */}
				</div>
			</div>
		</div>
	);
};

export default PageInputs;
