import React from 'react';
import styles from './Button.module.css';

const OutlinedButton = ({ children, onClick, rounded }) => {
	return (
		<div
			className={styles.buttonOutlined}
			onClick={onClick}
			style={{ borderRadius: rounded ? 4 : 30 }}>
			<p>{children}</p>
		</div>
	);
};

export default OutlinedButton;
