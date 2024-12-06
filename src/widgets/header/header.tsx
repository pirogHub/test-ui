import React, {useEffect} from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import {styled} from '@mui/material';
import Image from 'next/image';

import {getIconUrlByName} from '@/shared/icons/icons-data';
import {useCustomStore} from '@/shared/providers/store-provider';
import {useThemeToggle} from '@/shared/providers/theme-provider';
import {Icon2} from '@/shared/ui/icon';

const Header = styled('header')`
	//styleName: Body/Body 15 - Medium;

	width: 100%;

	font-size: 15px;
	font-weight: 500;
	line-height: 18px;
	text-align: left;
	text-underline-position: from-font;
	text-decoration-skip-ink: none;

	& .root {
		max-width: ${1344}px;
		box-izing: border-box;
		margin: 0 auto;
		min-height: 40px;
		justify-content: space-between;
		align-items: center;
		display: flex;
	}

	& .brand-logo {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	& .avatar-wrapper {
		display: flex;
		align-items: center;
		padding: 2.5px;
		background-color: rgba(46, 172, 251, 1);
		border-radius: 50%;
	}

	& .user-info {
		display: flex;
		align-items: start;
		justify-content: space-between;
		flex-direction: column;
		gap: 2px;
	}

	& .name-wrapper {
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

	& .profession {
		font-size: 15px;
		font-weight: 500;
		line-height: 18px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
		color: rgba(27, 31, 59, 0.65);
	}

	& .side-right {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}
`;

export const SkyHeader = () => {
	const {userStore} = useCustomStore();

	const {user, refetch, logout} = userStore;

	useEffect(() => {
		console.log('user', user);
	}, [user]);

	const {toggleTheme, isDarkMode} = useThemeToggle();
	return (
		<Header>
			<div className="root">
				<div className="brand-logo">
					<Image width="90" height="30" alt="Logo" src={getIconUrlByName('SkyLogo')} />
				</div>
				<div className="side-right">
					<div>
						<ButtonStyled
							view="flatted"
							isOnlyIcon
							isRounded
							sx={{
								padding: '0 5px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: '35px',
								height: '35px',
							}}
							onClick={toggleTheme}
							leftComponent={isDarkMode ? <BedtimeOutlinedIcon /> : <WbSunnyOutlinedIcon />}
						/>
					</div>
					{user ? (
						<div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
							<div className="avatar-wrapper">
								<Image
									style={{backgroundColor: 'rgba(46, 172, 251, 1)', borderRadius: '50%'}}
									width="35"
									height="35"
									alt="icon"
									src={user.avatar}
								/>{' '}
							</div>
							<div className="user-info">
								<div className="name-wrapper">
									{/* {user.name} */}
									Человек
									<Icon2 color="text1" size={14} url={getIconUrlByName('chevronDown')} />
								</div>
								<div className="profession">Повар</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</Header>
	);
};
