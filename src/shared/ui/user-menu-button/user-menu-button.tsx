import React from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {Fade, Popover, styled} from '@mui/material';
import Image from 'next/image';

import {getIconUrlByName} from '@/shared/icons/icons-data';
import {useCustomStore} from '@/shared/providers/store-provider';

import {Icon2} from '../icon';

const Root = styled('div', {name: 'SelectPopupWrapper'})`
	& .children-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: start;
		cursor: pointer;
	}
`;

const Card = styled('div', {name: 'Card'})`
	border-radius: 12px;
	color: rgba(255, 255, 255, 1); // TODO
	box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.08);
`;

const Content = styled('div', {name: 'Content'})`
	padding: 12px;
	gap: 12px;
	display: flex;
	flex-direction: column;

	.popup-user-info {
		display: flex;
		flex-direction: column;
		gap: 0px;
	}

	& .popup-user-name {
		font-size: 15px;
		font-weight: 500;
		line-height: 18px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: rgba(35, 31, 35, 1); // TODO
	}

	& .popup-user-email {
		font-size: 13px;
		font-weight: 500;
		line-height: 16px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;

		color: rgba(27, 31, 59, 0.65);
	}
`;

const BigDiv = styled('div', {name: 'BigDiv'})`
	display: flex;
	align-items: center;
	gap: 10px;

	& .main-avatar {
		display: flex;
		align-items: center;
		padding: 2.5px;
		background-color: rgba(46, 172, 251, 1);
		border-radius: 50%;
	}

	& .main-user-info {
		display: flex;
		align-items: start;
		justify-content: space-between;
		flex-direction: column;
		gap: 2px;
	}

	& .main-user-name {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		width: 100%;
		gap: 4px;

		font-size: 15px;
		font-weight: 700;
		line-height: 20px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: rgba(35, 31, 35, 1);
	}

	& .main-user-profession {
		font-size: 15px;
		font-weight: 500;
		line-height: 18px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: rgba(27, 31, 59, 0.65);
	}
`;

const UserMenuButton: React.FC = () => {
	const {userStore} = useCustomStore();

	const {
		user,
		// refetch,
		logout,
	} = userStore;

	const [isOpen, setIsOpen] = React.useState(false);
	const anchorElRef = React.useRef<HTMLDivElement | null>(null);

	const id = 'simple-popover';

	const anchorEl = anchorElRef.current;

	return !user ? null : (
		<Fade in={Boolean(user)} timeout={100} unmountOnExit mountOnEnter>
			<Root>
				<div
					className="children-wrapper"
					ref={anchorElRef}
					aria-describedby={id}
					onClick={() => setIsOpen(!isOpen)}
				>
					<BigDiv style={{}}>
						<div className="main-avatar">
							<Image
								style={{backgroundColor: 'rgba(46, 172, 251, 1)', borderRadius: '50%'}}
								width="35"
								height="35"
								alt="icon"
								src={user.avatar}
							/>
						</div>
						<div className="main-user-info">
							<div className="main-user-name">
								{user.name}
								<Icon2
									sx={{
										transition: 'all 0.12s cubic-bezier(1, 0.01, 1, 1.2)',
										transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
									}}
									color="text1"
									size={14}
									url={getIconUrlByName('chevronDown')}
								/>
							</div>
							<div className="main-user-profession">{user.role === 'default' ? 'Повар' : 'Аналитик'}</div>
						</div>
					</BigDiv>

					<div></div>
				</div>
				<Popover
					sx={{
						marginTop: '8px',
					}}
					id={id}
					open={isOpen}
					anchorEl={() => anchorElRef.current}
					onClose={() => setIsOpen(false)}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
				>
					<Card>
						<Content>
							<div className="popup-user-info">
								<div className="popup-user-name">{user.name}</div>
								<div className="popup-user-email">{user.email}</div>
							</div>
							<ButtonStyled
								leftComponent={<Icon2 size={20} url={getIconUrlByName('logout')} />}
								label="Выход из аккаунта"
								view="flatted"
								onClick={logout}
							/>
						</Content>
					</Card>
				</Popover>
			</Root>
		</Fade>
	);
};

export default UserMenuButton;
