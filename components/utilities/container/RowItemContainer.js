import React from 'react';
import styles from './Container.module.css';
import IconButton from '../button/IconButton';

const RowItemContainer = ({ children, onClick }) => {
	return (
		<div onClick={onClick} className={styles.rowItems}>
			{children}
			{onClick && <IconButton icon='flag' size={20} onClick={onClick} />}
		</div>
	);
};

export default RowItemContainer;
