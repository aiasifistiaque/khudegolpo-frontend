import React from 'react';
import styles from './Profile.module.css';

const ProfileContainer = ({ children }) => {
	return <div className={styles.profileContainer}>{children}</div>;
};

export default ProfileContainer;
