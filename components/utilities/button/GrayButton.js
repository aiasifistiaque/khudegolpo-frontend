import React from 'react';
import styles from './Button.module.css';

const GrayButton = ({ children, onClick }) => {
	return (
		<div className={styles.grayButton} onClick={onClick}>
			<p>{children}</p>
		</div>
	);
};

export default GrayButton;
