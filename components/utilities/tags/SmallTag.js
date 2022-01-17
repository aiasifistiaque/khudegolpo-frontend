import React from 'react';
import styles from './Tags.module.css';

export const SmallTag = ({ children, red }) => {
	return (
		<div className={red ? styles.redTag : styles.greenTag}>
			<p>{children}</p>
		</div>
	);
};
