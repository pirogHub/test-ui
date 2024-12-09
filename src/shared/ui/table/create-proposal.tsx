'use client';

import React from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import ProposalCreatePage from '@/widgets/proposal/proposal-create-page';
import {Modal as BaseModal, Fade, TextareaAutosize, css, styled} from '@mui/material';
import {toast} from 'sonner';

import {useToasts} from '@/shared/hooks/use-toasts';
import {getIconUrlByName} from '@/shared/icons/icons-data';

import {Icon2} from '../icon';

const Modal = styled(BaseModal)`
	// TODO id=59376
	position: fixed;
	z-index: 1300;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Backdrop = React.forwardRef<HTMLDivElement, {open?: boolean; className: string}>((props, ref) => {
	// TODO id=230120238
	const {open, className, ...other} = props;
	return (
		<Fade in={open}>
			<div className={className} ref={ref} {...other} />
		</Fade>
	);
});

Backdrop.displayName = 'Backdrop';

const StyledBackdrop = styled(Backdrop)`
	z-index: -1;
	position: fixed;
	inset: 0;
	background-color: rgb(0 0 0 / 0.5);
	-webkit-tap-highlight-color: transparent;
`;

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
				closeAfterTransition
				sx={{
					paddingInline: '157px',
				}}
			>
				<Fade in={open}>
					<div style={{width: '100%'}}>
						<ProposalCreatePage closeModal={handleClose} isModalOpen={open} />
					</div>
				</Fade>
			</Modal>
		</div>
	);
};
