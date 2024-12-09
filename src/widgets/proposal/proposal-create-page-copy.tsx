import React, {useMemo, useState} from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {Checkbox, Fade, TextareaAutosize} from '@mui/material';

import {getIconUrlByName} from '@/shared/icons/icons-data';
import {Icon2} from '@/shared/ui/icon';
import {SkyCard} from '@/shared/ui/sky-card/sky-card';
import {SkyCheckbox} from '@/shared/ui/sky-checkbox/sky-checkbox';
import {DragAndDrop} from '@/shared/ui/sky-drag-and-drop/drag-and-drop';
import SkyTextAreaField from '@/shared/ui/sky-textarea/sky-textarea';

import {ProposalFormInput, ProposalFormSelect} from './components/components-with-props';
import {ContentWrapper} from './components/content-wrapper';
import {SaveButton} from './components/save-button';
import {SectionRow as Row, Section, SectionsWrapper} from './components/section';

const ProposalCreatePage = ({closeModal}: {isModalOpen?: boolean; closeModal: () => void}) => {
	return (
		<SkyCard sx={{marginBlock: '112px', paddingRight: '5px'}} shadowFooter>
			<>
				<div className="content-header">
					<h2>Создать заявку на исследование</h2>
					<ButtonStyled
						onClick={closeModal}
						size="m"
						view="flatted"
						leftComponent={
							<Icon2 onClick={closeModal} color="icon2" size={28} url={getIconUrlByName('chest')} />
						}
					/>
				</div>
				<ContentWrapper>
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
											/>

											<ProposalFormInput isDisabled label="Срок исполнения" />
										</Row>

										<ProposalFormSelect
											label="Исполнитель"
											selectList={[
												{id: 'Иван 1', name: 'Иван 1'},
												{id: 'Иван 2', name: 'Иван 2'},
												{id: 'Иван 3', name: 'Иван 3'},
											]}
										/>
									</Row>
									<Row>
										<ProposalFormSelect
											label="Исследование"
											helpMessage="Вышел грека через реку видит грека в реке рак. Сунул грека руку в реку. Рак за руку грека цап"
											selectList={[
												{id: 'какое-то 1', name: 'Какое-то 1'},
												{id: 'какое-то 2', name: 'Какое-то 2'},
												{id: 'какое-то 3', name: 'Какое-то 3'},
											]}
										/>

										<ProposalFormInput label="Цель исследования" />
									</Row>
									<Row>
										<ProposalFormInput sizeInput="large" label="Исследуемые категории" />
										<ProposalFormInput noIcon={false} label="Исследуемые бренды" />
									</Row>
									<Row>
										<ProposalFormInput label="Конкуренты для сравнения" />
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
										/>

										<Row sx={{gap: '16px'}}>
											<ProposalFormInput isDisabled label="Дата начала" />
											<ProposalFormInput isDisabled label="Дата окончания" />
										</Row>
									</Row>

									<Row>
										<ProposalFormInput sxWrapper={{flex: 0.5}} label="Размер выборки" />
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
										/>

										<Row sx={{gap: '16px'}}>
											<ProposalFormInput
												// TODO only number
												label="Возраст"
											/>

											<ProposalFormInput
												// TODO only number
												label="Доход"
											/>
										</Row>
									</Row>

									<Row>
										<ProposalFormInput isRequired sxWrapper={{flex: 0.5}} label="Регион" />

										<ProposalFormInput sxWrapper={{flex: 0.5}} label="Другое" />
									</Row>
								</Section>
								<Section label="Формат предоставления исследования">
									<Row noCells sx={{gap: '46px'}}>
										<SkyCheckbox label="Кросс таблица" />
										<SkyCheckbox label="Отчет в формате презентации" />
									</Row>
								</Section>
								<Section label="Комментарий">
									<Row>
										<SkyTextAreaField />
									</Row>
									<Row>
										<DragAndDrop />
									</Row>
								</Section>
							</SectionsWrapper>
						</div>
					</div>
				</ContentWrapper>
				<div className="footer">
					<ButtonStyled onClick={closeModal} view="secondary" label="Назад" />
					<SaveButton onSave={closeModal} />
					<ButtonStyled label="Отправить" />
				</div>
			</>
		</SkyCard>
	);
};

export default ProposalCreatePage;
