import React from 'react';
import styles from './TextInput.module.css';

const CommentBox = ({ label, placeholder, value, onChange, required }) => {
	return (
		<div className={styles.cInput}>
			<label>{label}</label>
			<textarea
				rows='4'
				cols='25'
				required={required ? true : false}
				value={value}
				onChange={e => onChange(e.target.value)}
				style={{
					minHeight: 150,
					maxWidth: 500,
					backgroundColor: 'whitesmoke',
				}}>
				{value}
			</textarea>
		</div>
	);
};

export default CommentBox;
