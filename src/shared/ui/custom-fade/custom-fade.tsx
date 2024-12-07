import {styled} from '@mui/material';

export const CustomFader = styled('div', {
	shouldForwardProp: (propName) =>
		propName !== 'timeout' && propName !== 'withoutHeightCollapse' && propName !== 'withoutWidthCollapse',
})<{timeout?: number; withoutHeightCollapse?: boolean; withoutWidthCollapse?: boolean}>`
	/* transition: all 0.12s cubic-bezier(1, 0.01, 1, 1.2); */
	transition: all ${(p) => p.timeout || '120'}ms cubic-bezier(1, 0.01, 1, 1.2);
	white-space: nowrap;
	overflow: hidden;
	width: 100%;
	&.hide {
		transition: all ${(p) => p.timeout || '120'}ms cubic-bezier(1, 0.01, 1, 1.2);

		width: ${(p) => (p.withoutWidthCollapse ? '100%' : 0)};
		height: ${(p) => (p.withoutHeightCollapse ? 'auto' : 0)};
		opacity: 0;

		padding: 0;
		font-size: 0;
	}
`;
