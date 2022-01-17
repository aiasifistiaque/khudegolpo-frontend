import React from 'react';
import styles from './Container.module.css';

const PageContainer = ({ children }) => {
	return <div className={styles.pageContainer}>{children}</div>;
};

export default PageContainer;
