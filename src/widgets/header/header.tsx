import React, {useState} from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import {Button, styled} from '@mui/material';
import Image from 'next/image';

import {getIconUrlByName} from '@/shared/icons/icons-data';
import {useThemeToggle} from '@/shared/providers/theme-provider';
import UserMenuButton from '@/shared/ui/user-menu-button/user-menu-button';

const Header = styled('header')`
	width: 100%;

	font-size: 15px;
	font-weight: 500;
	line-height: 18px;
	text-align: left;
	text-underline-position: from-font;
	text-decoration-skip-ink: none;

	& .root {
		max-width: ${1344}px;
		box-sizing: border-box;
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

	& .side-right {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}
`;

export const SkyHeader = () => {
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

					<UserMenuButton />
				</div>
			</div>
		</Header>
	);
};
