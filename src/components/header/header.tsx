import React from 'react';

import Link from 'next/link';

import {useThemeToggle} from '@/shared/providers/theme-provider';

import {ButtonStyled} from '../ui-kit/button/button-styled';

export const Header = () => {
	const {toggleTheme} = useThemeToggle();
	return (
		<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
			<ul style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
				<li>
					<Link href={'/dashboard/page-buttons'}>page-buttons</Link>
				</li>
				<li>
					<Link href={'/dashboard/page-buttons-css'}>page-buttons-css</Link>
				</li>
				<li>
					<Link href={'/dashboard/page-inputs'}>page-inputs</Link>
				</li>
				<li>
					<Link href={'/dashboard/page-calendar'}>page-calendar</Link>
				</li>
				<li>
					<Link href={'/dashboard/page-statuses'}>page-statuses</Link>
				</li>
				<li>
					<Link href={'/dashboard/page-drug-and-drop'}>page-drug-and-drop</Link>
				</li>
				<li>
					<Link href={'/dashboard/page-table'}>page-table</Link>
				</li>
				{/* <li><Link href={'/dashboard/page-buttons'}></Link></li> */}
			</ul>

			<ButtonStyled onClick={toggleTheme} label="Toggle theme" />
		</div>
	);
};
