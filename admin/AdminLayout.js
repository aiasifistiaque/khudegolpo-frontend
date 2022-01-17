import React, { useState } from 'react';
import styles from './Admin.module.css';
import AdminHeader from './header/AdminHeader';
import AdminSidebar from './sidebar/AdminSidebar';

const AdminLayout = ({ children }) => {
	const [sidebar, setSidebar] = useState(true);

	return (
		<div>
			<AdminHeader
				barPressed={sidebar}
				open={() => setSidebar(true)}
				close={() => setSidebar(false)}
			/>
			<main className={styles.container}>
				<AdminSidebar barPressed={sidebar} />
				<div style={{ marginLeft: sidebar ? '200px' : '2rem' }}>{children}</div>
			</main>
		</div>
	);
};

export default AdminLayout;
