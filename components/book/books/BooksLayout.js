import React from 'react';
import styles from './Books.module.css';

const BooksLayout = ({ children }) => {
	return <div className={styles.layout}>{children}</div>;
};

export default BooksLayout;
