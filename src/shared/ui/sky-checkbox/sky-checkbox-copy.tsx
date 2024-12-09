import React from 'react';

import {styled} from '@mui/material';

import {getIconUrlByName} from '@/shared/icons/icons-data';

const sizeStyles = {
	l: {
		checkboxSize: '24px',
		fontSize: '16px',
		borderRadius: '7px',
	},
	m: {
		checkboxSize: '20px',
		fontSize: '13px',
		borderRadius: '5px',
	},
	s: {
		checkboxSize: '16px',
		fontSize: '13px',
		borderRadius: '5px',
	},
};

const CheckboxContainer = styled('label')<{size: 'l' | 'm' | 's'}>`
	display: inline-flex;
	align-items: center;
	cursor: pointer;
	user-select: none;
	input {
		display: none;
	}
	.checkbox {
		width: ${(props) => sizeStyles[props.size].checkboxSize};
		height: ${(props) => sizeStyles[props.size].checkboxSize};
		border: 1px solid rgba(216, 218, 224, 1);
		border-radius: ${(props) => sizeStyles[props.size].borderRadius};
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
		background-color: #fff;
		&:hover {
			border-color: #2eacfb;
		}
		&.checked {
			border-color: #2eacfb;
			background-color: #2eacfb;
			&::after {
				content: '';
				display: block;
				width: ${(props) => sizeStyles[props.size].checkboxSize};
				height: ${(props) => sizeStyles[props.size].checkboxSize};
				background-size: contain;
				background-repeat: no-repeat;
				background-position: center;
				mask-image: url(${getIconUrlByName('check')});
				mask-size: contain;
				mask-repeat: no-repeat;
				mask-position: center;
				background-color: white;
			}
		}
	}
	.label {
		margin-left: 8px;
		color: #1b1f3b;
		font-size: ${(props) => sizeStyles[props.size].fontSize};
		font-weight: 500;
	}
`;

type CheckboxProps = {
	size?: 'l' | 'm' | 's';
	label?: string;
	checked?: boolean;
	// value?: boolean;
	name?: string;
	onChange?: (checked: boolean) => void;
	onBlur?: () => void;
};

export const SkyCheckbox: React.FC<CheckboxProps> = ({
	checked = false,
	label,
	size = 'm',
	name,
	onBlur,
	onChange,
	...rest
}) => {
	const [isChecked, setIsChecked] = React.useState(checked);

	const handleChange = () => {
		const newChecked = !isChecked;
		setIsChecked(newChecked);
		onChange?.(newChecked);
	};
	return (
		<CheckboxContainer size={size}>
			<input
				//
				type="checkbox"
				name={name}
				checked={isChecked}
				onChange={handleChange}
				onBlur={onBlur}
				{...rest}
			/>
			<div className={`checkbox ${isChecked ? 'checked' : ''}`} />
			{label && <span className="label">{label}</span>}
		</CheckboxContainer>
	);
};
