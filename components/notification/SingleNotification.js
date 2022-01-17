import React from 'react';
import styles from './Notifications.module.css';
import Link from 'next/link';
import DateText from '../utilities/text/DateText';

const to = notification => {
	const { type, target } = notification;

	if (type == 'follow') {
		return `/u/${target}`;
	} else if (type == 'book') {
		return `/book?id=${target}`;
	} else if (type == 'unlock') {
		return `/chapter?id=${target}`;
	} else if (type == 'bookcomment') {
		return `/book?id=${target}`;
	} else if (type == 'chaptercomment') {
		return `/chapter?id=${target}`;
	}
	return '/dashboard/info';
};

const SingleNotification = ({ item }) => {
	return (
		<Link href={to(item)}>
			<div className={styles.notification}>
				<img src={item?.image ? item.image : '/logo.png'} atl='notification' />
				<div className={styles.text}>
					<p style={item?.seen == false ? { fontWeight: '600' } : null}>
						{item?.details}
					</p>
					<DateText>{item.createdAt}</DateText>
				</div>
			</div>
		</Link>
	);
};

export default SingleNotification;
