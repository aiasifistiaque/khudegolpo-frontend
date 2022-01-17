import React from 'react';
import styles from './Dashboard.module.css';

const DashLayout = ({ children }) => {
	return <div className={styles.layout}>{children}</div>;
};

export default DashLayout;
