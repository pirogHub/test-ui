import React from 'react';

import {Fade, styled} from '@mui/material';

const Backdrop = React.forwardRef<HTMLDivElement, {open?: boolean; className: string}>((props, ref) => {
	// TODO id=230120238
	const {open, className, ...other} = props;
	return (
		<Fade in={open}>
			<div className={className} ref={ref} {...other} />
		</Fade>
	);
});

Backdrop.displayName = 'Backdrop';

export const StyledBackdrop = styled(Backdrop)`
	z-index: -1;
	position: fixed;
	inset: 0;
	background-color: rgb(0 0 0 / 0.5);
	-webkit-tap-highlight-color: transparent;
`;
