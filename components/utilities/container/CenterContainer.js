import React from 'react';
import styles from './Container.module.css';

const CenterContainer = ({ children }) => {
	return <div className={styles.center}>{children}</div>;
};

export default CenterContainer;
