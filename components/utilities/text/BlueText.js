import React from 'react';
import styles from './Text.module.css';

const BlueText = ({ children }) => {
	return <p className={styles.blueText}>{children}</p>;
};

export default BlueText;
