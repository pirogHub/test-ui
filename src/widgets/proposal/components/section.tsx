import React, {Children} from 'react';

import {styled} from '@mui/material';

export const SectionsWrapper = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 32px;
`;

const SectionRoot = styled('div')`
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
		/* & .cell {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 24px;
		} */
		/* 
		& .row {
			display: flex;
			flex: 1;
			gap: 24px;
			width: 100%;
			& .half {
				flex: 1;
			}
		} */
	}
`;

export const Section: React.FC<React.PropsWithChildren<{label?: string}>> = ({label, children}) => {
	return (
		<>
			<SectionRoot>
				{label && <div className="section-name">{label}</div>}
				<div className="section-content">{children}</div>
			</SectionRoot>
		</>
	);
};

const SectionRowRoot = styled('div', {
	label: 'section-row-root',
})`
	display: flex;
	flex: 1;
	gap: 24px;
	width: 100%;
	& .half {
		flex: 1;
	}
`;

export const SectionCell = styled('div', {
	label: 'section-cell-root',
})`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 24px;
`;

export const SectionRow: React.FC<
	React.PropsWithChildren<React.ComponentProps<typeof SectionRowRoot> & {inRow?: boolean; noCells?: boolean}>
> = ({children, inRow, noCells, ...props}) => {
	const Wrapper = noCells ? React.Fragment : SectionCell;
	// if (inRow) {
	// 	return (
	// 		<SectionRowRoot {...props}>
	// 			<SectionRowRoot>
	// 				<Wrapper>{children}</Wrapper>
	// 			</SectionRowRoot>
	// 		</SectionRowRoot>
	// 	);
	// }
	return (
		<SectionRowRoot {...props}>
			{Children.map(children, (child) => (
				<Wrapper>{child}</Wrapper>
			))}
		</SectionRowRoot>
	);
};
