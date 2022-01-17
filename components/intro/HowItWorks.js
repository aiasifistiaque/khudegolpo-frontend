import React from 'react';
import styles from './Stats.module.css';

const HowItWorks = () => {
	return (
		<div className={styles.howItWorks}>
			<h3>How This Works!!!</h3>
			<div className={styles.container}>
				<Section image='/hiw1.png' title='Create'>
					AREWABOOKS is a great place to share your creative stories. Discover
					the writing tools you{`'`}ll need to write a storyline.
				</Section>
				<SectionReverse image='/hiw2.png' title='Build'>
					As your book grows in popularity and readers, build a world loyal
					audience. By telling original stories.
				</SectionReverse>
				<Section image='/hiw3.png' title='Amplify'>
					Earn passive income from your unique stories while it may feature on
					top in store, and you eligiable for Verified Badge as best Author!
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
				<h4 style={{ fontWeight: '700' }}>{title}</h4>
				<p style={{ fontSize: 18, lineHeight: 1.5 }}>{children}</p>
			</div>
		</div>
	);
};

const SectionReverse = ({ image, title, children }) => {
	return (
		<div className={styles.section}>
			<div className={styles.text}>
				<h4 style={{ fontWeight: '700' }}>{title}</h4>
				<p style={{ fontSize: 18, lineHeight: 1.5 }}>{children}</p>
			</div>
			<div className={styles.image}>
				<img src={image} alt='hiw' />
			</div>
		</div>
	);
};

export default HowItWorks;
