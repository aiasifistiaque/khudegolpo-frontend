import React from 'react';
import styles from '../Admin.module.css';

const AdminItemRow = ({ children }) => {
	return <div className={styles.items}>{children}</div>;
};

export default AdminItemRow;
