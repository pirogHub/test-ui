import React from 'react';

import Link from 'next/link';

export const Header = () => {
	return (
		<div>
			<ul>
				<li>
					<Link href={'/dashboard/page-buttons'}>page-buttons</Link>
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
				{/* <li><Link href={'/dashboard/page-buttons'}></Link></li> */}
			</ul>
		</div>
	);
};
