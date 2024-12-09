import React, {useMemo} from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {SkyHeader} from '@/widgets';
import {FormValues} from '@/widgets/proposal/proposal-create-page';
import {styled} from '@mui/material';
import {useSearchParams} from 'next/navigation';
import {useRouter} from 'next/router';

import {getIconUrlByName} from '@/shared/icons/icons-data';
import {Icon2} from '@/shared/ui/icon';
import {SkyCard} from '@/shared/ui/sky-card/sky-card';
import {StatusBadge} from '@/shared/ui/status-badge';

import Section, {NamedRow} from './(components)/section';

const Content = styled('div')`
	// TODO id=2358923467 занести в layout
	max-width: ${1344}px;
	margin: 0 auto;
`;
const PageDescription = styled('div')`
	// TODO id=2358923467 занести в layout
	display: flex;
	flex-direction: row;
	justify-content: space-between;
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

const ProposalTitle = styled('div')`
	font-family: Gilroy;
	font-size: 28px;
	font-weight: 600;
	line-height: 30.8px;
	text-align: left;
	text-underline-position: from-font;
	text-decoration-skip-ink: none;
`;

const SideLeft = styled(SkyCard)`
	// TODO наследоваться от SkyCard и перенести общие свойства и как там прокидывать еще и стилевые пропсы
	flex: 1;
	/* padding: 24px; */
	box-shadow: none;
	background-color: rgba(255, 255, 255, 1); // TODO customized styled
`;
const SideRight = styled(SkyCard)`
	// TODO наследоваться от SkyCard и перенести общие свойства
	width: 396px;
	/* padding: 24px; */
	box-shadow: none;
	background-color: rgba(255, 255, 255, 1); // TODO customized styled
`;

// const defaultValues: FormValues = {
const fetchedProposalData = {
	// основная информация
	rightSide: {
		proposalType: 'outer',
		proposalStatus: 'specified', // TODO in FormValues. пусть создаётся во время создания заявки автоматически
		dateDeadline: '',
		executor: '',
	},
	mainInfo: {
		researchType: 'Профиль нового покупателя: анализ предпочтений и ожиданий',
		researchGoal:
			'Анализ изменений в поведении, предпочтениях и ожиданиях современных потребителей, особенно в контексте новых тенденций, вызванных цифровизацией и изменениями в социальных и экономических условиях',
		researchCategories: 'Маркетинг',
		researchBrands: 'Алгоритм Капитал',
		competitorsForComparison: 'DigitalPulse Insights, MarketShift Solutions, BuyerMind Research',
	},
	adCampaign: {
		// Рекламная компания
		adType: 'Digital, Radio',
		dateStart: '23.04.24',
		dateEnd: '25.05.24',
		sampleSize: '1000',
	},
	targetCriteria: {
		// Критерии отбора респондентов
		targetGender: 'Мужской',
		targetAge: '25 лет',
		targetEarnings: '150 000',
		targetRegion: 'Cанкт-Петербург',
		other: ``,
	},
	comments: {
		// Формат предоставления исследования
		formatCrossTable: true,
		formatPresentation: false,
		// Комментарий
		comment:
			'Мы планируем определить основные факторы, влияющие на потребительское поведение. Это позволит выявить закономерности, которые ранее не были очевидны, и понять, какие аспекты наиболее критичны для успеха в данной области.',
		files: [
			{
				lastModified: 1732979647212,
				// lastModifiedDate: 'Sat Nov 30 2024 18:14:07 GMT+0300 (Moscow Standard Time) {}',
				name: 'vercel.svg',
				size: 629,
				type: 'image/svg+xml',
				webkitRelativePath: '',
				href: '123',
				// arrayBuffer: async () => new ArrayBuffer(0),
				// slice: async () => new ArrayBuffer(0),
				// stream: async () => new ReadableStream(),
				// text: async () => '',
			},
			{
				lastModified: 1732979647212,
				// lastModifiedDate: 'Sat Nov 30 2024 18:14:07 GMT+0300 (Moscow Standard Time) {}',
				name: 'vercel.svg',
				size: 629,
				type: 'image/svg+xml',
				webkitRelativePath: '',
				href: '123',
			},
		],
	},
};

const dictProposalType = {
	// TODO
	inner: 'Внутренняя',
	outer: 'Внешняя',
};

const dictionary = {
	// rightSide: {
	rightSide: 'Основное',
	'rightSide.proposalType': 'Тип заявки',
	'rightSide.proposalStatus': 'Статус', // TODO in FormValues. пусть создаётся во время создания заявки автоматически
	'rightSide.dateDeadline': 'Сроки исполнения',
	'rightSide.executor': 'Исполнитель',
	mainInfo: 'Общая информация',
	// mainInfo: {
	'mainInfo.researchType': 'Исследование',
	'mainInfo.researchGoal': 'Цель исследования',
	'mainInfo.researchCategories': 'Категории',
	'mainInfo.researchBrands': 'Бренды',
	'mainInfo.competitorsForComparison': 'Конкуренты',
	// },
	adCampaign: 'Рекламная компания',
	// adCampaign: {
	// Рекламная компания
	'adCampaign.adType': 'Тип рекламной капмании',
	'adCampaign.dateStart': 'Период рекламной кампании',
	'adCampaign.dateEnd': 'Период рекламной кампании',
	'adCampaign.sampleSize': 'Размер выборки',
	// },
	targetCriteria: 'Критерии отбора респондентов',
	// targetCriteria: {
	// Критерии отбора респондентов
	'targetCriteria.targetGender': 'Пол',
	'targetCriteria.targetAge': 'Взораст',
	'targetCriteria.targetEarnings': 'Доход',
	'targetCriteria.targetRegion': 'Регион',
	'targetCriteria.other': 'Другое',
	// },
	comments: 'Формат предоставления',
	// comments: {
	// Формат предоставления исследования
	// TODO
	'comments.formatCrossTable': 'Кросс-таблица',
	'comments.formatPresentation': false,
	// Комментарий
	'comments.comment': 'Комментарий',
	'comments.files': 'Прочие файлы',
	// },
};

type FetchedProposalDataKeysType = keyof typeof fetchedProposalData;
type FetchedProposalDataSecondLevelKeys = {
	[K in FetchedProposalDataKeysType]: keyof (typeof fetchedProposalData)[K];
}[FetchedProposalDataKeysType];

const FileItem = styled('div')`
	display: flex;
	border-bottom: 1px solid rgba(234, 234, 234, 1);
	flex-direction: row;
	flex: 1;
	justify-content: space-between;
`;

const FileWrapper = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 0px;
	padding-block: 8px;
	width: 100%;

	& .file-item:first-of-type {
		padding-top: 0;
		padding-bottom: 8px;
	}
	& .file-item:last-of-type {
		border-bottom: none;
		padding-top: 8px;
		padding-bottom: 0;
	}
`;

const renderFieldValByKey = <
	T extends FetchedProposalDataKeysType, // Первый уровень ключей
	// K extends keyof (typeof fetchedProposalData)[T], // Второй уровень ключей
	K extends {
		[K in T]: keyof (typeof fetchedProposalData)[K];
	}[T], // Второй уровень ключей
>(
	key: T,
	subKey: K,
	val: (typeof fetchedProposalData)[T][K],
): React.ReactNode => {
	if (key === 'comments' && subKey === 'files' && Array.isArray(val)) {
		return (
			<FileWrapper>
				{val.map((file) => (
					<FileItem className="file-item" key={file?.name}>
						<div>{file?.name}</div>
						<div>{file.size}</div>
					</FileItem>
				))}
			</FileWrapper>
		);
	} else if (subKey === 'proposalType') {
		return dictProposalType[val];
	} else if (subKey === 'proposalStatus') {
		return <StatusBadge status={val} />;
	} else if (typeof val === 'boolean') {
		return <div>{val ? 'Yes' : 'No'}</div>;
	} else if (typeof val === 'string') {
		return <div>{val || '–'}</div>;
	} else {
		return 'OBJECT';
	}
};
const ProposalOnePage = ({...params}) => {
	const router = useRouter();
	const appId = router.query.id;
	console.log('userSlug', appId);

	const sectionKeys = useMemo(() => {
		return Object.keys(fetchedProposalData) as FetchedProposalDataKeysType[];
	}, []);
	return (
		<>
			<SkyHeader />
			<Content>
				<PageDescription>
					<div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
						<ButtonStyled
							view="secondary"
							size="m"
							onClick={() => router.back()}
							leftComponent={
								<Icon2
									color="primary1"
									size={20}
									url={getIconUrlByName('chevronDown')}
									sx={{transform: 'rotate(90deg)'}}
								/>
							}
						/>

						<ProposalTitle>Заявка №{appId}</ProposalTitle>
					</div>
					<div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
						<ButtonStyled view="secondary" size="m" label="Редактировать" />
						<ButtonStyled view="primary" size="m" label="Отправить" />
					</div>
				</PageDescription>
				<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: '16px'}}>
					<SideLeft>
						{sectionKeys.map((sectionKey) => {
							if (sectionKey === 'rightSide') return null;
							const fields = fetchedProposalData[sectionKey];
							const sectionName = dictionary?.[sectionKey];
							// const sectionName = sectionKey;
							return (
								<Section key={sectionKey} label={sectionName}>
									{Object.entries(fields).map(([fieldKey, fieldVal]) => {
										// let label = dictionary?.[`${sectionKey}.${fieldKey}`];
										let label = dictionary?.[`${sectionKey}.${fieldKey}`];
										label = label ? label + ':' : fieldKey;
										return (
											<NamedRow key={fieldKey} label={label}>
												{renderFieldValByKey(sectionKey, fieldKey, fieldVal)}
											</NamedRow>
										);
									})}
								</Section>
							);
						})}
						{/* <Section label="Общая информация">
							<NamedRow label="Исследование:">
								Профиль нового покупателя: анализ предпочтений и ожиданий
							</NamedRow>
							<NamedRow label="Цель исследования::">
								Анализ изменений в поведении, предпочтениях и ожиданиях современных потребителей,
								особенно в контексте новых тенденций, вызванных цифровизацией и изменениями в социальных
								и экономических условиях
							</NamedRow>
							<NamedRow label="Категории:">Маркетинг</NamedRow>
							<NamedRow label="Бренды:">Алгоритм Капитал</NamedRow>
							<NamedRow label="Конкуренты:">test name</NamedRow>
						</Section> */}
					</SideLeft>
					<SideRight>
						<Section key={'rightSide'} label={dictionary?.['rightSide']}>
							{Object.entries(fetchedProposalData['rightSide']).map(([fieldKey, fieldVal]) => {
								// let label = dictionary?.[`${sectionKey}.${fieldKey}`];
								let label = dictionary?.[`${'rightSide'}.${fieldKey}`];
								label = label ? label + ':' : fieldKey;
								return (
									<NamedRow
										sx={{
											gap: '4px',
											'& .row-label': {
												color: 'rgba(27, 31, 59, 0.4)',
											},
											'& .row-content': {
												color: ' rgba(35, 31, 35, 1);',
											},
										}}
										column
										key={fieldKey}
										label={label}
									>
										{renderFieldValByKey('rightSide', fieldKey, fieldVal)}
									</NamedRow>
								);
							})}
						</Section>
					</SideRight>
				</div>
			</Content>
		</>
	);
};

export default ProposalOnePage;
