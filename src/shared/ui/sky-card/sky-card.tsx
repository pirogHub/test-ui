import {css, styled} from '@mui/material';

export const SkyCard = styled('div', {
	label: 'card',
	shouldForwardProp: (propName) => propName !== 'shadowFooter' && propName !== 'sx',
})<{shadowFooter?: boolean}>(
	(p) => css`
		position: relative;
		background-color: rgba(255, 255, 255, 1); // TODO colors
		box-shadow:
			0px 4px 24px 0px rgba(0, 0, 0, 0.12),
			0px 1px 3px 0px rgba(0, 0, 0, 0.05);

		border-radius: 12px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		width: 100%;
	`,
);
