import React from 'react';
import styles from './TextInput.module.css';

const TextInput = ({
	label,
	placeholder,
	value,
	onChange,
	password,
	required,
	type,
	onKeyPress,
	disabled,
	min,
}) => {
	return (
		<div className={styles.cInput}>
			<label>{label}</label>
			<input
				type={type ? type : password ? 'password' : 'text'}
				placeholder={placeholder}
				value={value}
				onChange={e => onChange(e.target.value)}
				onKeyPress={onKeyPress}
				required={required ? true : false}
				disabled={disabled ? true : false}
				min={min}
			/>
		</div>
	);
};

export default TextInput;
