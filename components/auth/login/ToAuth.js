import React from 'react';
import styles from './Login.module.css';
import Link from 'next/link';

const ToAuth = ({ children, href }) => {
	return (
		<div className={styles.newUser}>
			<p>{children}</p>
			<Link href={`/${href}`}>
				<a>{href}</a>
			</Link>
		</div>
	);
};

export default ToAuth;
