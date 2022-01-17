import React from 'react';
import styles from './Text.module.css';

const Caption = ({ children, style, textStyle, color }) => {
	return (
		<div className={styles.caption} style={{ ...style }}>
			<p style={{ color: color || 'black', ...textStyle }}>{children}</p>
		</div>
	);
};

export default Caption;
