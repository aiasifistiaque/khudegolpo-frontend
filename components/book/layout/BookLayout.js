import React from 'react';
import styles from './BookLayout.module.css';

const BookLayout = ({ children }) => {
	return <div className={styles.layout}>{children}</div>;
};

export default BookLayout;
