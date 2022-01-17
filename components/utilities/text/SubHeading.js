import React from 'react';
import styles from './Text.module.css';

const SubHeading = ({ children }) => {
	return (
		<div className={styles.subHeading}>
			<p>{children}</p>
		</div>
	);
};

export default SubHeading;
