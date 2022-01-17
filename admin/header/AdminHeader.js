import React, { useEffect } from 'react';
import styles from './AdminHeader.module.css';
import Link from 'next/link';

const AdminHeader = ({ barPressed, open, close, on, search, onClick }) => {
	return (
		<div className={styles.header} onClick={onClick}>
			<div className={styles.name}>
				<div className={styles.menuIcon} onClick={barPressed ? close : open}>
					<img src='/icons/menu-white2.png' alt='menu icon' />
				</div>
				<Link href='/admin/info'>
					<h5>Admin Panel</h5>
				</Link>
			</div>

			<div className={styles.options}>
				<Link href='/'>
					<div
						className={styles.option}
						style={{ paddingLeft: 16, paddingRight: 16 }}>
						<p>Back Home</p>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default AdminHeader;
