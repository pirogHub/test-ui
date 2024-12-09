import {useMemo} from 'react';

import {ButtonStyled} from '@/components/ui-kit/button/button-styled';
import {styled} from '@mui/material';
import {toast} from 'sonner';

import {getIconUrlByName} from '../icons/icons-data';
import {Icon2} from '../ui/icon';

const SkyToastRoot = styled('div')`
	background: rgba(255, 255, 255, 1);
	display: flex;
	justify-content: space-between;
	border-radius: 8px;
	min-width: 344px;
	padding: 12px;
	box-shadow:
		0px 0px 2px 0px rgba(0, 16, 61, 0.06),
		0px 0px 6px 0px rgba(0, 0, 0, 0.06),
		0px 6px 12px 0px rgba(0, 16, 61, 0.06);

	font-size: 15px;
	font-weight: 500;
	line-height: 18px;
	text-align: left;
	text-underline-position: from-font;
	text-decoration-skip-ink: none;

	& .cell {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const SkyToast = ({toastId, type, message}: {type: 'success' | 'error'; toastId: string | number; message: string}) => {
	return (
		<SkyToastRoot>
			<div className="cell toast-side icon-wrapper">
				<Icon2
					color={type === 'success' ? 'positive' : 'error'}
					size={28}
					url={getIconUrlByName(type === 'success' ? 'checkCircle' : 'chestCircle')}
				/>
			</div>
			<div className="cell message-wrapper">{message}</div>
			<ButtonStyled
				className="cell toast-side chest-wrapper"
				color="text1"
				leftComponent={<Icon2 size={32} url={getIconUrlByName('chest')} />}
				view="flatted"
				onClick={() => toast.dismiss(toastId)}
			/>

			{/* TODO сделать кнопку крестик 
			TODO сделать серый flatted */}
		</SkyToastRoot>
	);
};

export const useToasts = () => {
	return useMemo(() => {
		return {
			toast: {
				success: (message: string) => {
					toast.custom((t) => <SkyToast type="success" message={message} toastId={t} />);
				},
				error: (message: string) => {
					toast.custom((t) => <SkyToast type="error" message={message} toastId={t} />);
				},
			},
		};
	}, []);
};
