import React from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {Modal as BaseModal, Fade, TextareaAutosize, css, styled} from '@mui/material';

import {getIconUrlByName} from '@/shared/icons/icons-data';

import {Icon2} from '../icon';
import {InputField} from '../input';

const Backdrop = React.forwardRef<HTMLDivElement, {open?: boolean; className: string}>((props, ref) => {
	const {open, className, ...other} = props;
	return (
		<Fade in={open}>
			<div className={className} ref={ref} {...other} />
		</Fade>
	);
});

const Modal = styled(BaseModal)`
	position: fixed;
	z-index: 1300;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

Backdrop.displayName = 'Backdrop';

const StyledBackdrop = styled(Backdrop)`
	z-index: -1;
	position: fixed;
	inset: 0;
	background-color: rgb(0 0 0 / 0.5);
	-webkit-tap-highlight-color: transparent;
`;

const SavedButtonModalDescription = styled('div')`
	font-family: Gilroy;
	font-size: 15px;
	font-weight: 500;
	line-height: 18px;
	text-align: left;
	text-underline-position: from-font;
	text-decoration-skip-ink: none;
	color: rgba(27, 31, 59, 0.65);
	padding-inline: 24px;
`;

const SavedButton = ({onSave}: {onSave: () => void}) => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<ButtonStyled onClick={handleOpen} view="secondary" label="Сохранить" />
			<Modal
				open={open}
				// onClose={handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
				slots={{backdrop: StyledBackdrop}}
			>
				<Fade in={open}>
					{/* // TODO create brand card-component  */}
					<Card sx={{width: '448px', gap: '24px'}}>
						<ContentWrapper sx={{overflow: 'hidden'}}>
							<div style={{paddingBlock: '12px 8px'}} className="content-header">
								<h2>Сохранить заявку</h2>
								<ButtonStyled
									onClick={handleClose}
									view="secondary"
									leftComponent={
										<Icon2
											onClick={handleClose}
											color="icon2"
											size={28}
											url={getIconUrlByName('chest')}
										/>
									}
								/>
							</div>
							<SavedButtonModalDescription>
								Это позволит сохранить вам введенные данные и вернуться к ним позже
							</SavedButtonModalDescription>
						</ContentWrapper>
						<div style={{paddingInline: '16px', paddingTop: 0}} className="footer">
							<ButtonStyled view="secondary" onClick={handleClose}>
								Отмена
							</ButtonStyled>
							<ButtonStyled
								onClick={() => {
									onSave();
									handleClose();
								}}
							>
								Сохранить
							</ButtonStyled>
						</div>
					</Card>
				</Fade>
			</Modal>
		</React.Fragment>
	);
};

const MediumInput: React.FC<React.ComponentProps<typeof InputField>> = ({...props}) => {
	return (
		<InputField {...props} sizeInput={'medium'} sxWrapper={{width: '100%', ...props.sxWrapper}} isWithoutErrors />
	);
};

export const CreateProposal = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<ButtonStyled
				onClick={handleOpen}
				leftComponent={<Icon2 color="icon2" size={24} url={getIconUrlByName('plus')} />}
				size="m"
				view="primary"
				label="Создать"
			/>
			<Modal
				open={open}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
				slots={{backdrop: StyledBackdrop}}
				sx={{
					paddingInline: '157px',
				}}
			>
				<Fade in={open}>
					<Card
						sx={{marginBlock: '112px', paddingRight: '5px', maxHeight: 'calc(100vh - 224px)'}}
						shadowFooter
					>
						<div className="content-header">
							<h2>Создать заявку на исследование</h2>
							<ButtonStyled
								onClick={handleClose}
								view="secondary"
								leftComponent={
									<Icon2
										onClick={handleClose}
										color="icon2"
										size={28}
										url={getIconUrlByName('chest')}
									/>
								}
							/>
						</div>
						<ContentWrapper>
							<div className="content-body-wrapper">
								<div className="content-body">
									<SectionsWrapper>
										<Section>
											<div className="section-name">Основная информация</div>
											<div className="section-content">
												<div className="row">
													<div className="row" style={{gap: '16px'}}>
														<MediumInput label="Тип заявки" />
														<MediumInput label="Срок исполнения" />
													</div>
													<MediumInput label="Исполнитель" />
												</div>
												<div className="row">
													<MediumInput label="Тип заявки" />
													<MediumInput label="Исполнитель" />
												</div>
												<div className="row">
													<MediumInput label="Тип заявки" />
													<MediumInput label="Исполнитель" />
												</div>
												<div className="row">
													<MediumInput label="Тип заявки" />
													<div className="half" />
												</div>
											</div>
										</Section>
										<Section>
											<div className="section-name">Рекламная компания</div>
											<div className="section-content">
												<div className="row">
													<MediumInput label="Исполнитель" />
													<div className="row" style={{gap: '16px'}}>
														<MediumInput label="Тип заявки" />
														<MediumInput label="Срок исполнения" />
													</div>
												</div>

												<div className="row">
													<MediumInput sxWrapper={{flex: 0.5}} label="Тип заявки" />
													<div className="half" />
												</div>
											</div>
										</Section>
										<Section>
											<div className="section-name">Критерии отбора респондентов</div>
											<div className="section-content">
												<div className="row">
													<MediumInput label="Исполнитель" />
													<div className="row" style={{gap: '16px'}}>
														<MediumInput label="Тип заявки" />
														<MediumInput label="Срок исполнения" />
													</div>
												</div>

												<div className="row">
													<MediumInput sxWrapper={{flex: 0.5}} label="Тип заявки" />
													<MediumInput sxWrapper={{flex: 0.5}} label="Тип заявки" />
												</div>
											</div>
										</Section>
										<Section>
											<div className="section-name">Формат предоставления исследования</div>
											<div className="section-content">
												<div className="row">
													<div className="row half" style={{gap: '16px'}}>
														<MediumInput label="Тип заявки" />
														<MediumInput label="Срок исполнения" />
													</div>
													<div className="half"></div>
												</div>
											</div>
										</Section>
										<Section>
											<div className="section-name">Комментарий</div>
											<div className="section-content">
												<div className="row">
													<TextareaAutosize />
												</div>
											</div>
										</Section>
									</SectionsWrapper>
								</div>
							</div>
						</ContentWrapper>
						<div className="footer">
							<ButtonStyled onClick={handleClose} view="secondary" label="Назад" />
							<SavedButton onSave={handleClose} />
							<ButtonStyled label="Отправить" />
						</div>
					</Card>
				</Fade>
			</Modal>
		</div>
	);
};

// max-height: calc(100vh - 80px - 112px - 68px - 112px);
const ContentWrapper = styled('div')`
	overflow: auto;
	margin-bottom: 5px;
	& .content-body-wrapper {
		display: flex;
		flex-direction: column;
		gap: 24px;

		/* max-height: inherit; */
	}

	& .content-body {
		padding: 24px 35px 24px 40px;
		margin-bottom: 64px;
		/* margin-right: -5px; */
		/* overflow: auto; */
	}
`;

const Card = styled('div', {
	label: 'card',
	shouldForwardProp: (propName) => propName !== 'shadowFooter' && propName !== 'sx',
})<{shadowFooter?: boolean}>(
	(p) => css`
		background-color: rgba(255, 255, 255, 1);
		/* box-shadow:
			0px 4px 24px 0px rgba(0, 0, 0, 0.12),
			0px 1px 3px 0px rgba(0, 0, 0, 0.05); */

		border-radius: 12px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		width: 100%;

		& .content-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: -5px;

			padding: 24px 16px 16px 40px;
			gap: 10px;
			& h2 {
				margin: 0; // TODO у всех h1, h2, h3 убрать
				font-size: 28px;
				font-weight: 600;
				line-height: 30.8px;
				text-align: left;
				text-underline-position: from-font;
				text-decoration-skip-ink: none;
			}
		}

		& .footer {
			margin-right: -5px; // подвинули скролл у боди, и у этого элемента двигаем обратно
			display: flex;
			justify-content: flex-end;
			padding: 12px 40px 16px 40px;
			gap: 10px;
			${p.shadowFooter
				? 'box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.12), 0px 1px 3px 0px rgba(0, 0, 0, 0.05)'
				: ''}
		}
	`,
);

const SectionsWrapper = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 32px;
`;

const Section = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 22px;

	& .section-name {
		//styleName: Headline/Headline 18 - Semibold;
		font-family: Gilroy;
		font-size: 18px;
		font-weight: 600;
		line-height: 21.6px;
		letter-spacing: -0.02em;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
	}

	& .section-content {
		display: flex;
		gap: 24px;
		flex-direction: column;
		& .col {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 24px;
		}

		& .row {
			display: flex;
			gap: 24px;
			width: 100%;
			& .half {
				flex: 0.5;
			}
		}
	}
`;
