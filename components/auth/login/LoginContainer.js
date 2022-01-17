import React from 'react';
import styles from './Login.module.css';

const LoginContainer = ({ children }) => {
	return <div className={styles.login}>{children}</div>;
};

export default LoginContainer;
