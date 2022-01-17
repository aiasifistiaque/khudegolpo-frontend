import React from 'react';
import styles from '../Admin.module.css';
import Link from 'next/link';
import moment from 'moment';

const AdminItem = ({ children, title, link, href, date, onClick }) => {
	if (link)
		return (
			<div className={styles.item} style={{ flex: 0 }}>
				{title ? (
					<h6>{children}</h6>
				) : (
					<Link href={href || '/admin'}>
						<a>{children}</a>
					</Link>
				)}
			</div>
		);
	return (
		<div className={styles.item}>
			{title ? (
				<h6 onClick={onClick} style={onClick ? { cursor: 'pointer' } : null}>
					{children}
				</h6>
			) : (
				<p>{date ? moment(children).calendar() : children}</p>
			)}
		</div>
	);
};

export default AdminItem;
