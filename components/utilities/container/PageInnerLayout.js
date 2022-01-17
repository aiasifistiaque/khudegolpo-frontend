import React from 'react';
import styles from './Container.module.css';

const PageInnerLayout = ({ children }) => {
	return <div className={styles.pageInnerLayout}>{children}</div>;
};

export default PageInnerLayout;
