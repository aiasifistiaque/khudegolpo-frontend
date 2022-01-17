import React from 'react';
import styles from './Container.module.css';

const FaqContainer = ({ children }) => {
	return <div className={styles.faq}>{children}</div>;
};

export default FaqContainer;
