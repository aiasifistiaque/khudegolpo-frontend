import React from 'react';
import styles from './Container.module.css';

const CenterVertical = ({ children }) => {
	return <div className={styles.centerVertical}>{children}</div>;
};

export default CenterVertical;
