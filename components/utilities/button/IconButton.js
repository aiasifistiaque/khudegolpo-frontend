import React from 'react';
import styles from './Button.module.css';

const IconButton = ({ children, onClick, bg, color, style, icon, size }) => {
	return (
		<div
			className={bg ? styles.textButtonBg : styles.textButton}
			onClick={onClick}
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<img
				alt={icon}
				src={`/icons/${icon}.png`}
				style={{ height: size || 14, width: size || 14 }}
			/>
			<p style={{ marginLeft: children ? 6 : 0 }}>{children}</p>
		</div>
	);
};

export default IconButton;
