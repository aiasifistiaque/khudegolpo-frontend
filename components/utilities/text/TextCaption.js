import React from 'react';
import styles from './Text.module.css';

const TextCaption = ({ children }) => {
	return (
		<div className={styles.textCaption}>
			<p>{children}</p>
		</div>
	);
};

export default TextCaption;
