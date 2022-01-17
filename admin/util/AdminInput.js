import React from 'react';
import styles from './AdminInput.module.css';

const AdminInput = ({
	label,
	placeholder,
	value,
	onChange,
	password,
	required,
	type,
	onKeyPress,
	disabled,
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
			/>
		</div>
	);
};

export default AdminInput;
