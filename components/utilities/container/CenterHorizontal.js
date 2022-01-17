import React from 'react';
import styles from './Container.module.css';

const Horizontal = ({ children }) => {
	return <div className={styles.centerHorizontal}>{children}</div>;
};

export default Horizontal;
