import React from 'react';
import styles from './TextInput.module.css';

const ObjSelect = ({ value, onChange, data, label }) => {
	return (
		<div className={styles.cInput}>
			<label>{label}</label>
			<select
				value={value}
				onChange={e => {
					onChange(e.target.value);
				}}
				style={{ textTransform: 'capitalize' }}>
				{data.map((option, i) => (
					<option key={i} value={option.value}>
						{option.option}
					</option>
				))}
			</select>
		</div>
	);
};

export default ObjSelect;
