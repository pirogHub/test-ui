import {forwardRef} from 'react';

import {InputField} from '@/shared/ui/input';
import SelectMenu from '@/shared/ui/select-menu/select-menu';

// export const ProposalFormInput: React.FC<React.ComponentProps<typeof InputField>> = ({...props}) => {
export const ProposalFormInput = forwardRef<HTMLInputElement, React.ComponentProps<typeof InputField>>(
	({...props}, ref) => {
		return (
			<InputField
				ref={ref}
				isRequired
				noIcon
				sizeInput={'medium'}
				sxWrapper={{width: '100%', flex: 1, ...props.sxWrapper}}
				isWithClearButton
				{...props}
			/>
		);
	},
);

ProposalFormInput.displayName = 'ProposalFormInput';

export const ProposalFormSelect = forwardRef<HTMLDivElement, React.ComponentProps<typeof SelectMenu>>(
	({...props}, ref) => {
		// export const ProposalFormSelect: React.FC<React.ComponentProps<typeof SelectMenu>> = ({...props}) => {
		return (
			<SelectMenu
				ref={ref}
				closeWhenSelect
				isRequired
				noIcon
				sizeInput="medium"
				//
				{...props}
			/>
		);
	},
);

ProposalFormSelect.displayName = 'ProposalFormSelect';
