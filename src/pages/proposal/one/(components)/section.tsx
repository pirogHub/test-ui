/* eslint-disable check-file/folder-naming-convention */
import React, {Children} from 'react';

import {SxProps, styled} from '@mui/material';

const SectionRoot = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 20px;
	font-family: Gilroy;
	padding: 20px;

	& .section-label {
		//styleName: Headline 18 – Semibold;
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
`;

const ContentRows = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const NamedRowRoot = styled('div', {
	label: 'named-row-root',
	shouldForwardProp: (prop) => prop !== 'column',
})<{column?: boolean}>`
	display: flex;
	gap: 16px;
	flex-direction: ${(p) => (p.column ? 'column' : 'row')};

	& .row-label {
		color: rgba(27, 31, 59, 0.4);
	}
`;

export const NamedRow: React.FC<React.PropsWithChildren<{label: string; column?: boolean; sx?: SxProps}>> = ({
	label,
	children,
	column,
	sx,
}) => {
	return (
		<NamedRowRoot column={column} sx={sx}>
			<div className="row-label" style={{minWidth: '164px', width: '164px'}}>
				{label}
			</div>
			<div className="row-content" style={{display: 'flex', flex: 1}}>
				{children}
			</div>
		</NamedRowRoot>
	);
};

const Section: React.FC<
	React.PropsWithChildren<{label: string; infoList?: {id: string; label: string; value: string}[]}>
> = ({children, label, infoList}) => {
	// const childrenArray
	return (
		<SectionRoot>
			<label className="section-label">{label}</label>
			<ContentRows>{children}</ContentRows>
		</SectionRoot>
	);
};

export default Section;
