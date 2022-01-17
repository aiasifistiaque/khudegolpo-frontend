import React, { useState } from 'react';
import { css } from '@emotion/react';
import styles from '../Admin.module.css';

const AdminLoading = () => {
	let [loading, setLoading] = useState(true);
	let [color, setColor] = useState('#000');
	return (
		<div
			style={{
				display: 'flex',
				padding: '4rem 0',
				alignItems: 'center',
				justifyContent: 'center',
				flex: 1,
				minHeight: '80vh',
			}}>
			{/* <h5>loading...</h5> */}
			<div className={styles.loader} />
		</div>
	);
};

export default AdminLoading;
