import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {skyAllianceMUITheme} from '@/styles/theme';
import {getThemedColor} from '@/styles/theme/colors';
import Header from '@/widgets/header/header';
import {zodResolver} from '@hookform/resolvers/zod';
import {styled} from '@mui/material';

import {getIconUrlByName} from '@/shared/icons/icons-data';
import {Icon2} from '@/shared/ui/icon';
import {InputField} from '@/shared/ui/input';

import {LoginFormValues, loginSchema} from '../../types/user.types';

const FormWrapper = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 28px;
	min-width: 456px;
	margin: auto;
	padding: 40px 32px;
	border-radius: 16px;
	background-color: ${({theme}) => (theme as skyAllianceMUITheme)?.colors?.base1};
`;

const Label = styled('div')`
	gap: '10px';
	text-align: 'center';
	line-height: '18px';
	font-size: '15px';
	font-weight: 500;
	color: ${({theme}) => (theme as skyAllianceMUITheme)?.colors?.base4};

	& .email-label {
		color: ${({theme}) => (theme as skyAllianceMUITheme)?.colors?.primary1};
	}
`;

const Title = styled('h2')`
	display: flex;
	justify-content: center;
	text-align: center;
`;

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
												color="icon1"
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
					<Label>
						Не можете войти в систему?
						<br /> Напишите нам{' '}
						<span className="email-label" style={{display: 'inline'}}>
							help@skyalliance.media
						</span>
					</Label>
				</FormWrapper>
			</div>
		</>
	);
};

export default LoginPage;
