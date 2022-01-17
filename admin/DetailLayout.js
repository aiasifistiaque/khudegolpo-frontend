import React from 'react';
import styles from './Admin.module.css';

const DetailLayout = ({ children }) => {
	return <div className={styles.detailLayout}>{children}</div>;
};

export default DetailLayout;
