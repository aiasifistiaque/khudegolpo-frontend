import React from 'react';
import styles from './Refill.module.css';

const PageCard = ({ children }) => {
	return (
		<div className={styles.layout}>
			<div className={styles.card}>{children}</div>
		</div>
	);
};

export default PageCard;
