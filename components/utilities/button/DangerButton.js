import React from 'react';
import styles from './Button.module.css';

const DangerButton = ({ children, onClick }) => {
	return (
		<div className={styles.danger} onClick={onClick}>
			<p>{children}</p>
		</div>
	);
};

export default DangerButton;
