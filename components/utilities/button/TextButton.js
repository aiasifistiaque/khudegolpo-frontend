import React from 'react';
import styles from './Button.module.css';

const TextButton = ({ children, onClick, bg, color, style }) => {
	return (
		<div
			className={bg ? styles.textButtonBg : styles.textButton}
			onClick={onClick}
			style={style}>
			<p style={{ color: color || 'dodgerblue' }}>{children}</p>
		</div>
	);
};

export default TextButton;
