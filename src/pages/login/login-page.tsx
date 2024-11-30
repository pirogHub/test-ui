import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import Header from '@/widgets/header/header';
import {zodResolver} from '@hookform/resolvers/zod';
import {styled} from '@mui/material';

import {getIconUrlByName} from '@/shared/icons/icons-data';
import {Icon2} from '@/shared/ui/icon';
import {InputField} from '@/shared/ui/input';

import {LoginFormValues, loginSchema} from './types';

const FormWrapper = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 28px;
	min-width: 456px;
	margin: auto;
	padding: 40px 32px;
	/* border: 1px solid #ccc; */
	border-radius: 16px;
	background-color: white;
`;

const Title = styled('h2')`
	display: flex;
	justify-content: center;
	text-align: center;
`;

// export const FormFieldInput = styled('input', {
// 	shouldForwardProp: (prop) =>
// 		prop !== 'error' && prop !== 'withLeftIcon' && prop !== 'inputPrefix' && prop !== 'as' && prop !== 'sx',
// })<{error?: string; withLeftIcon?: boolean}>`
// 	outline: none;
// 	width: 100%;
// 	padding: 8px 10px;
// 	${(p) => (p.withLeftIcon ? 'padding-left: 24px' : '')};
// 	box-sizing: border-box;
// 	font-size: 14px;
// 	line-height: 16px;

// 	border-radius: 6px;
// 	border-width: 1px;
// 	border-style: solid;

// 	&:disabled {
// 		cursor: not-allowed;
// 	}
// `;

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: {errors, isValid},
		watch,
		getValues,
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			login: '',
			password: '',
		},
		mode: 'onTouched',
	});

	const autoFilledFields = useRef<string[]>(Object.keys(getValues()));

	const onSubmit = (data: LoginFormValues) => {
		console.log('Form Submitted:', data);
	};

	useEffect(() => {
		const {unsubscribe} = watch((value) => {
			isAutoFillAlreadyProcessedRef.current = true;
			setIsAutoFilled(false);
		});
		return () => unsubscribe();
	}, [watch]);

	const isAutoFillAlreadyProcessedRef = useRef(false);
	const [isAutoFilled, setIsAutoFilled] = useState(false);
	const [isShowPassword, setIsShowPassword] = React.useState(false);
	const userNameInputProps = register('login', {required: true});
	const passwordInputProps = register('password', {required: true});

	const onAutoFill = (name: string) => {
		if (isAutoFillAlreadyProcessedRef.current) {
			return;
		}
		const it = autoFilledFields.current.findIndex((f) => f === name);
		if (it !== -1) {
			autoFilledFields.current.splice(it, 1);
		}
		if (autoFilledFields.current.length === 0) {
			setIsAutoFilled(true);
			isAutoFillAlreadyProcessedRef.current = true;
		}
	};

	return (
		<>
			<Header />

			<div
				style={{
					width: '100%',
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<FormWrapper>
					<Title>Вход в систему</Title>
					<div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
						<div style={{display: 'flex', flexDirection: 'column'}}>
							<InputField
								onAutoFill={onAutoFill}
								{...userNameInputProps}
								type="text"
								label="Логин"
								placeholder="Введите логин"
								error={errors?.login?.message}
							/>

							<InputField
								onAutoFill={onAutoFill}
								{...passwordInputProps}
								type={isShowPassword ? 'text' : 'password'}
								label="Пароль"
								placeholder="Введите пароль"
								error={errors.password?.message}
								leftComponentsArray={[
									{
										component: (
											<Icon2
												color="rgba(164, 165, 177, 1)"
												sx={{cursor: 'pointer'}}
												onClick={() => setIsShowPassword((prev) => !prev)}
												size={24}
												url={getIconUrlByName(isShowPassword ? 'eyeOn' : 'eyeOff')}
											/>
										),
										key: 'show-password',
									},
								]}
							/>
						</div>
						<ButtonStyled size="xl" onClick={handleSubmit(onSubmit)} disabled={!isAutoFilled && !isValid}>
							Войти
						</ButtonStyled>
					</div>
					<div
						style={{
							// display: 'flex',
							gap: '10px',
							// justifyContent: 'center',
							// alignItems: 'center',
							textAlign: 'center',
							lineHeight: '18px',
							fontSize: '15px',
							fontWeight: 500,
							color: 'rgba(27, 31, 59, 0.4)',
						}}
					>
						Не можете войти в систему?
						<br /> Напишите нам{' '}
						<a style={{display: 'inline'}} href="mailto:help@skyalliance.media">
							help@skyalliance.media
						</a>
					</div>
				</FormWrapper>
			</div>
		</>
	);
};

export default LoginPage;
