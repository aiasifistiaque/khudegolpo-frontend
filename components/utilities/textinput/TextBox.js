import React from 'react';
import styles from './TextInput.module.css';

const TextBox = ({ label, placeholder, value, onChange, required }) => {
	return (
		<div className={styles.cInput}>
			<label>{label}</label>
			<textarea
				rows='4'
				cols='50'
				required={required ? true : false}
				value={value}
				onChange={e => onChange(e.target.value)}>
				{value}
			</textarea>
		</div>
	);
};

export default TextBox;
