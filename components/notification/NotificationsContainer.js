import React from 'react';
import styles from './Notifications.module.css';

const NotificationsContainer = ({ children }) => {
	return <div className={styles.notifications}>{children}</div>;
};

export default NotificationsContainer;
