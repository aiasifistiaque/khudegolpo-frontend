import React from 'react';
import styles from './Button.module.css';

const SmallButton = ({ children, onClick }) => {
	return (
		<div className={styles.small} onClick={onClick}>
			<p>{children}</p>
		</div>
	);
};

export default SmallButton;
