import React from 'react';
import styles from './Button.module.css';

const Tags = ({ children }) => {
	return (
		<div className={styles.tags}>
			<p>{children}</p>
		</div>
	);
};

export default Tags;
