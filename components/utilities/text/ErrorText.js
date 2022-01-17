import React from 'react';
import styles from './Text.module.css';

const ErrorText = ({ children }) => {
	return (
		<div className={styles.errorText}>
			<p>{children}</p>
		</div>
	);
};

export default ErrorText;
