import React from 'react';
import styles from './Button.module.css';

const ButtonOutlinedLongDanger = ({ children, onClick, rounded }) => {
	return (
		<div
			className={styles.buttonOutlinedLongDanger}
			onClick={onClick}
			style={rounded && { borderRadius: 4 }}>
			<p>{children}</p>
		</div>
	);
};

export default ButtonOutlinedLongDanger;
