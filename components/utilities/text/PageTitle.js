import React from 'react';
import styles from './Text.module.css';

const PageTitle = ({ children }) => {
	return (
		<div className={styles.pageTitle}>
			<h5>{children}</h5>
		</div>
	);
};

export default PageTitle;
