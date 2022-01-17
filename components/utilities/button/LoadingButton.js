import React from 'react';
import styles from './Button.module.css';

const LoadingButton = ({ children }) => {
	return (
		<div className={styles.loadingButton}>
			<p>loading...</p>
		</div>
	);
};

export default LoadingButton;
