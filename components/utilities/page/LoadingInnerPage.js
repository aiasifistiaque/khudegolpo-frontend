import React from 'react';
import styles from './Page.module.css';

const LoadingInnerPage = () => {
	return (
		<div className={styles.loadingInnerPage}>
			<div className={styles.loader} />
		</div>
	);
};

export default LoadingInnerPage;
