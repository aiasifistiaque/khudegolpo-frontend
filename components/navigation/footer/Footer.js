import React from 'react';
import data from './data';
import styles from './Footer.module.css';
import Link from 'next/link';
import StoreIcons from '../../utilities/extras/StoreIcons';

const Footer = () => {
	return (
		<>
			<div className={styles.footer}>
				<div className={styles.contact}>
					<h5>Contact Us</h5>
					<p style={{ fontSize: '1.2rem' }}>Khudegolpo Publishers</p>
					<p>WhatsApp: 09031774742 </p>
					<p>Email: arewabookspublishers@gmail.com</p>
					<p></p>
				</div>

				<div className={styles.items}>
					{data.map((x, i) => (
						<Section key={i} title={x.title} items={x.items} />
					))}
				</div>
			</div>

			<div className={styles.footNote}>
				<div className={styles.store}>
					<StoreIcons />
				</div>
				<p>
					Copyright 2021, Khudegolpo | ALL RIGHTS RESERVED | Powered by{' '}
					<a href='http://thinkcrypt.io'>thinkcrypt.io</a>
				</p>
			</div>
		</>
	);
};

const Section = ({ title, items }) => {
	return (
		<div className={styles.section}>
			<h5>{title}</h5>
			{items.map((item, i) => (
				<Link key={i} href={item.to}>
					<a>{item.title}</a>
				</Link>
			))}
		</div>
	);
};

export default Footer;
