import React from 'react';
import styles from './Stats.module.css';

const GetDiscovered = () => {
	return (
		<div className={styles.howItWorks} style={{ margin: '5rem 0' }}>
			<h4>Visit Our Blog</h4>
			<br />
			<div className={styles.container}>
				<Section image='/getdiscovered.png'>
					<h5>Be visitng our Blog for these benefits</h5>
					<ul style={{ textAlign: 'left' }}>
						<li>Writing Tips</li>
						<li>Writing Contests</li>
						<li>Events etc</li>
					</ul>
				</Section>
			</div>
		</div>
	);
};

const Section = ({ image, title, children }) => {
	return (
		<div className={styles.section}>
			<div className={styles.image}>
				<img src={image} alt='hiw' />
			</div>
			<div className={styles.text}>
				<h4>{title}</h4>
				<p>{children}</p>
			</div>
		</div>
	);
};

export default GetDiscovered;
