import React from 'react';
import styles from './Button.module.css';

const LongButton = ({
	children,
	submit,
	onClick,
	danger,
	rounded,
	noMargin,
	bottomRounded,
	loading,
}) => {
	const roundedBottom = bottomRounded
		? {
				borderTopRightRadius: 0,
				borderTopLeftRadius: 0,
				borderBottomLeftRadius: 4,
				borderBottomRightRadius: 4,
		  }
		: rounded
		? { borderRadius: 4 }
		: { borderRadius: 30 };

	if (submit)
		return (
			<input type='submit' value={children} className={styles.longButton} />
		);
	if (loading)
		return (
			<div
				className={styles.longButton}
				style={{
					margin: noMargin ? 0 : '.25rem',
					...roundedBottom,
					backgroundColor: '#e4e4e4',
					border: 'none',
				}}>
				<p style={{ color: 'rgba(0,0,0,.6)' }}>loading...</p>
			</div>
		);
	else
		return (
			<div
				className={danger ? styles.longButtonDanger : styles.longButton}
				onClick={onClick}
				style={{
					margin: noMargin ? 0 : '.25rem',
					...roundedBottom,
				}}>
				<p>{children}</p>
			</div>
		);
};

export default LongButton;
