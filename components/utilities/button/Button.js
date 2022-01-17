import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, disabled, loading, danger, rounded }) => {
	if (disabled || loading)
		return (
			<div className={styles.buttonDisabled}>
				<p>{loading ? 'loading...' : children}</p>
			</div>
		);
	return (
		<div
			className={danger ? styles.buttonDanger : styles.button}
			onClick={onClick}
			style={{ borderRadius: rounded ? 4 : 30 }}>
			<p>{children}</p>
		</div>
	);
};

export default Button;
