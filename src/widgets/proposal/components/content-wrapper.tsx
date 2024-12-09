import {styled} from '@mui/material';

export const SkyCardFooter = styled('div')`
	margin-right: -5px; // подвинули скролл у боди, и у этого элемента двигаем обратно
	display: flex;
	justify-content: flex-end;
	padding: 12px 40px 16px 40px;
	gap: 10px;
	&.withShadow {
		box-shadow:
			0px 4px 24px 0px rgba(0, 0, 0, 0.12),
			0px 1px 3px 0px rgba(0, 0, 0, 0.05);
	}
	background-color: rgba(255, 255, 255, 1);
`;

export const SkyCardHeader = styled('div')`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-right: -5px;
	z-index: 1;

	padding: 24px 16px 16px 40px;
	gap: 10px;

	transition: all 0.5s ease;

	&.withShadow {
		box-shadow:
			0px 4px 12px 0px rgba(0, 0, 0, 0.05),
			0px 1px 3px 0px rgba(0, 0, 0, 0.05);
		transition: all 0.2s ease;
	}

	& h2 {
		margin: 0; // TODO у всех h1, h2, h3 убрать
		font-size: 28px;
		font-weight: 600;
		line-height: 30.8px;
		text-align: left;
		text-underline-position: from-font;
		text-decoration-skip-ink: none;
	}
`;
export const SkyCardContentWrapper = styled('div', {
	// TODO переместить в папку со всеми кард элементами
	label: 'card-content-wrapper',
})<{}>`
	overflow: auto;
	margin-block: 0px 2px;
	& .content-body-wrapper {
		display: flex;
		flex-direction: column;
		gap: 24px;

		/* max-height: inherit; */
	}

	& .content-body {
		padding: 24px 35px 24px 40px;
		margin-bottom: 64px;
		/* margin-right: -5px; */
		/* overflow: auto; */
	}
`;
