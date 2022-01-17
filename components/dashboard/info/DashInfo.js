import React from 'react';
import styles from './Info.module.css';
import { useRouter } from 'next/router';
import TextButton from '../../utilities/button/TextButton';

const DashInfo = ({ name, username, email, description, balance, earning }) => {
	return (
		<div className={styles.container}>
			<h5>My Profile</h5>
			<div className={styles.info}>
				<Item title='Name'>{name}</Item>
				<Item title='Username'>{username}</Item>
				<Item title='Email'>{email}</Item>
				<Item title='Description'>{description}</Item>
			</div>
			<div className={styles.wallet}>
				<WalletItem title='Balance' button='Recharge' href='/refill'>
					{balance}
				</WalletItem>
				<WalletItem title='Earnings' button='Withdraw' href='/withdraw'>
					{earning}
				</WalletItem>
			</div>
		</div>
	);
};

const Item = ({ title, children }) => {
	return (
		<>
			<h6>{title}</h6>
			<p>{children}</p>
		</>
	);
};

const WalletItem = ({ children, title, button, href }) => {
	const router = useRouter();
	return (
		<div className={styles.item}>
			<div className={styles.text}>
				<h6>{title}</h6>
				<p>{children} NGN</p>
			</div>
			<div className={styles.button}>
				<TextButton
					bg
					onClick={() => {
						router.push(href);
					}}>
					{button}
				</TextButton>
			</div>
		</div>
	);
};

export default DashInfo;
