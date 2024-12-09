import React from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {Modal as BaseModal, Fade, styled} from '@mui/material';

import {getIconUrlByName} from '@/shared/icons/icons-data';
import {Icon2} from '@/shared/ui/icon';
import {SkyCard} from '@/shared/ui/sky-card/sky-card';

import {StyledBackdrop} from './backdrop';
import {SkyCardContentWrapper, SkyCardFooter, SkyCardHeader} from './content-wrapper';

const Modal = styled(BaseModal)`
	// TODO id=59376
	position: fixed;
	z-index: 1300;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
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

export const SaveButton = ({onSave}: {onSave: () => void}) => {
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
					<SkyCard sx={{width: '448px', gap: '24px'}}>
						<SkyCardContentWrapper sx={{overflow: 'hidden'}}>
							<SkyCardHeader sx={{paddingBlock: '12px 8px'}} className="content-header">
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
							</SkyCardHeader>
							<SavedButtonModalDescription>
								Это позволит сохранить вам введенные данные и вернуться к ним позже
							</SavedButtonModalDescription>
						</SkyCardContentWrapper>
						<SkyCardFooter sx={{paddingInline: '16px', paddingTop: 0}} className="footer">
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
						</SkyCardFooter>
					</SkyCard>
				</Fade>
			</Modal>
		</React.Fragment>
	);
};
