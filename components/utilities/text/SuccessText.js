import React from 'react';
import styles from './Text.module.css';

const SuccessText = ({ children }) => {
	return (
		<div className={styles.successText}>
			<p>{children}</p>
		</div>
	);
};

export default SuccessText;
