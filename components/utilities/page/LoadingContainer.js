import React from 'react';
import styles from './Page.module.css';

const LoadingContainer = () => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				margin: '4rem',
			}}>
			<div className={styles.loader} />
		</div>
	);
};

export default LoadingContainer;
