import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {zodResolver} from '@hookform/resolvers/zod';
import {Checkbox, Fade, TextareaAutosize, styled} from '@mui/material';
import clsx from 'clsx';
import {z} from 'zod';

import {useToasts} from '@/shared/hooks/use-toasts';
import {getIconUrlByName} from '@/shared/icons/icons-data';
import {Icon2} from '@/shared/ui/icon';
import {SkyCard} from '@/shared/ui/sky-card/sky-card';
import {SkyCheckbox} from '@/shared/ui/sky-checkbox/sky-checkbox';
import {DragAndDrop} from '@/shared/ui/sky-drag-and-drop/drag-and-drop';
import {SkyTextAreaField} from '@/shared/ui/sky-textarea/sky-textarea';

import {ProposalFormInput, ProposalFormSelect} from './components/components-with-props';
import {SkyCardContentWrapper, SkyCardFooter, SkyCardHeader} from './components/content-wrapper';
import {SaveButton} from './components/save-button';
import {SectionRow as Row, Section, SectionsWrapper} from './components/section';

const proposalFormSchema = z.object({
	proposalType: z.string().min(1, 'Выберите тип заявки'),
	dateDeadline: z.string().optional(),
	executor: z.string().min(1, 'Выберите исполнителя'),
	researchType: z.string().min(1, 'Выберите тип исследования'),
	researchGoal: z.string().min(1, 'Выберите цель исследования'),
	researchCategories: z.string().min(1, 'Заполните категории исследования'),
	researchBrands: z.string().min(1, 'Заполните исследуемые бренды'),
	competitorsForComparison: z.string().min(1, 'Впишите конкурентов для сравнения'),
	adType: z.string().min(1, 'Заполните цель исследования'),
	dateStart: z.string().optional(),
	dateEnd: z.string().optional(),
	sampleSize: z.string().min(1, 'Заполните размер выборки'),
	targetGender: z.string().min(1, 'Выберите пол'),
	targetAge: z.string().min(1, 'Впишите возраст'),
	targetEarnings: z.string().min(1, 'Впишите доход'),
	targetRegion: z.string().min(1, 'Впишите регион'),
	other: z.string().optional(),
	formatCrossTable: z.boolean(),
	formatPresentation: z.boolean(),
	comment: z.string().optional(),
	files:
		// z.instanceof(FileList)
		z
			.array(z.instanceof(File))
			.refine((fileList) => fileList.length > 0, {
				message: 'Пожалуйста, загрузите хотя бы один файл',
			})
			.refine(
				(fileList) => {
					// Дополнительная проверка для файлов, например, размер или тип файла
					for (let i = 0; i < fileList.length; i++) {
						const file = fileList[i];
						// Пример проверки размера файла (до 5MB)
						if (file.size > 5 * 1024 * 1024) {
							return false;
						}
					}
					return true;
				},
				{
					message: 'Файлы не должны превышать 5MB',
				},
			)
			.optional(), // Если требуется файловая валидация
});

type ProposalFormSchemaKeys = keyof typeof proposalFormSchema.shape; // Получаем тип ключей

const proposalFormSchemaKeys: ProposalFormSchemaKeys[] = Object.keys(
	proposalFormSchema.shape,
) as ProposalFormSchemaKeys[];

export type FormValues = z.infer<typeof proposalFormSchema>;
const defaultValues: FormValues = {
	// основная информация
	proposalType: '',
	dateDeadline: '',
	executor: '',
	researchType: '',
	researchGoal: '',
	researchCategories: '',
	researchBrands: '',
	competitorsForComparison: '',

	// Рекламная компания
	adType: '',
	dateStart: '',
	dateEnd: '',
	sampleSize: '',

	// Критерии отбора респондентов
	targetGender: '',
	targetAge: '',
	targetEarnings: '',
	targetRegion: '',
	other: '',
	// Формат предоставления исследования
	formatCrossTable: false,
	formatPresentation: false,
	// Комментарий
	comment: '',
	files: undefined,
};
const ProposalCreatePage = ({closeModal, isModalOpen}: {isModalOpen?: boolean; closeModal: () => void}) => {
	const {
		register,
		control,
		handleSubmit,
		getValues,
		watch,

		formState: {errors},
	} = useForm<FormValues>({
		resolver: zodResolver(proposalFormSchema),
		defaultValues,
	});
	const toast = useToasts();

	const onSubmit = (data: FormValues) => {
		console.log('Form data:', data);
		closeModal();
	};

	const saveProposal = useCallback(() => {
		const dataToSave = getValues();
		console.log('data To Save', dataToSave);
		closeModal();
		toast.toast.success('Заявка сохранена!');
	}, []);

	const formDataMap = useCallback(
		(key: ProposalFormSchemaKeys) => {
			return {
				...register(key),
				error: errors[key]?.message,
			};
		},
		[register, errors],
	);
	const [isEvenALittleScroll, setIsEvenALittleScroll] = useState(false);

	const scrollElemRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (scrollElemRef.current) {
			const elem = scrollElemRef.current;
			const handleScroll = () => {
				let scrollTop = 0;
				if (scrollElemRef?.current) {
					scrollTop = scrollElemRef?.current?.scrollTop;
				}
				setIsEvenALittleScroll(scrollTop > 10);
			};
			elem.addEventListener('scroll', handleScroll);
			return () => elem.removeEventListener('scroll', handleScroll);
		}
	}, [scrollElemRef]);

	return (
		<SkyCard sx={{marginBlock: '112px', paddingRight: '5px', maxHeight: 'calc(100vh - 112px)'}} shadowFooter>
			<SkyCardHeader className={clsx('content-header', {withShadow: isEvenALittleScroll})}>
				<h2>Создать заявку на исследование</h2>
				<ButtonStyled
					onClick={closeModal}
					size="m"
					view="flatted"
					leftComponent={
						<Icon2 onClick={closeModal} color="icon2" size={28} url={getIconUrlByName('chest')} />
					}
				/>
			</SkyCardHeader>
			<SkyCardContentWrapper ref={scrollElemRef}>
				<div className="content-body-wrapper">
					<div className="content-body">
						<SectionsWrapper>
							<Section label="Основная информация">
								<Row>
									<Row sx={{gap: '16px'}}>
										<ProposalFormSelect
											label="Тип заявки"
											selectList={[
												{id: 'inner', name: 'Внешняя'},
												{id: 'outer', name: 'Внутренняя'},
											]}
											{...formDataMap('proposalType')}
										/>
										<ProposalFormInput
											label="Срок исполнения"
											isDisabled
											{...formDataMap('dateDeadline')}
										/>
									</Row>
									<ProposalFormSelect
										label="Исполнитель"
										selectList={[
											{id: 'Иван 1', name: 'Иван 1'},
											{id: 'Иван 2', name: 'Иван 2'},
											{id: 'Иван 3', name: 'Иван 3'},
										]}
										{...formDataMap('executor')}
									/>
								</Row>
								<Row>
									<ProposalFormSelect
										label="Исследование"
										selectList={[
											{id: 'какое-то 1', name: 'Какое-то 1'},
											{id: 'какое-то 2', name: 'Какое-то 2'},
											{id: 'какое-то 3', name: 'Какое-то 3'},
										]}
										{...formDataMap('researchType')}
									/>
									<ProposalFormInput label="Цель исследования" {...formDataMap('researchGoal')} />
								</Row>
								<Row>
									<ProposalFormInput
										label="Исследуемые категории"
										{...formDataMap('researchCategories')}
									/>
									<ProposalFormInput
										noIcon={false}
										label="Исследуемые бренды"
										{...formDataMap('researchBrands')}
									/>
								</Row>
								<Row>
									<ProposalFormInput
										label="Конкуренты для сравнения"
										{...formDataMap('competitorsForComparison')}
									/>
									<div className="half" />
								</Row>
							</Section>

							<Section label="Рекламная компания">
								<Row>
									<ProposalFormSelect
										label="Тип рекламной компании"
										selectList={[
											{id: 'какое-то 1', name: 'Какое-то 1'},
											{id: 'какое-то 2', name: 'Какое-то 2'},
											{id: 'какое-то 3', name: 'Какое-то 3'},
										]}
										{...formDataMap('adType')}
									/>

									<Row sx={{gap: '16px'}}>
										<ProposalFormInput
											{...formDataMap('dateStart')}
											isDisabled
											label="Дата начала"
										/>
										<ProposalFormInput
											{...formDataMap('dateEnd')}
											isDisabled
											label="Дата окончания"
										/>
									</Row>
								</Row>

								<Row>
									<ProposalFormInput
										{...formDataMap('sampleSize')}
										sxWrapper={{flex: 0.5}}
										label="Размер выборки"
									/>
									<div className="half" />
								</Row>
							</Section>
							<Section label="Критерии отбора респондентов">
								<Row>
									<ProposalFormSelect
										label="Пол"
										selectList={[
											{id: 'man', name: 'Мужской'},
											{id: 'woman', name: 'Женский'},
											{id: 'both', name: 'Оба'},
										]}
										{...formDataMap('targetGender')}
									/>

									<Row sx={{gap: '16px'}}>
										<ProposalFormInput
											// TODO only number
											label="Возраст"
											{...formDataMap('targetAge')}
										/>

										<ProposalFormInput
											// TODO only number
											label="Доход"
											{...formDataMap('targetEarnings')}
										/>
									</Row>
								</Row>

								<Row>
									<ProposalFormInput
										{...formDataMap('targetRegion')}
										isRequired
										sxWrapper={{flex: 0.5}}
										label="Регион"
									/>

									<ProposalFormInput
										{...formDataMap('other')}
										isRequired={false}
										sxWrapper={{flex: 0.5}}
										label="Другое"
									/>
								</Row>
							</Section>
							<Section label="Формат предоставления исследования">
								<Row noCells sx={{gap: '46px'}}>
									<Controller
										name="formatCrossTable"
										control={control}
										defaultValue={false}
										render={({
											field,
											fieldState: {error}, // TODO error
										}) => <SkyCheckbox {...field} label="Кросс таблица" />}
									/>
									<Controller
										name="formatPresentation"
										control={control}
										defaultValue={false}
										render={({
											field,
											fieldState: {error},
											// TODO error
										}) => <SkyCheckbox {...field} label="Отчет в формате презентации" />}
									/>
								</Row>
							</Section>

							<Section label="Комментарий">
								<Row>
									<Controller
										name="comment"
										control={control}
										render={({
											field,
											fieldState: {error},
											// TODO error
										}) => <SkyTextAreaField {...field} label="Комментарий" />}
									/>
								</Row>
								<Row>
									<Controller
										name="files"
										control={control}
										render={({
											field,
											fieldState: {error},
											// TODO error
										}) => <DragAndDrop {...field} />}
									/>
								</Row>
							</Section>
						</SectionsWrapper>
					</div>
				</div>
			</SkyCardContentWrapper>
			<SkyCardFooter className="withShadow">
				<ButtonStyled onClick={closeModal} view="secondary" label="Назад" />
				<SaveButton onSave={saveProposal} />
				<ButtonStyled onClick={handleSubmit(onSubmit)} label="Отправить" />
			</SkyCardFooter>
		</SkyCard>
	);
};

export default ProposalCreatePage;
