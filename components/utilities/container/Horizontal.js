import React from 'react';
import styles from './Container.module.css';

const Horizontal = ({ children }) => {
	return <div className={styles.horizontal}>{children}</div>;
};

export default Horizontal;
