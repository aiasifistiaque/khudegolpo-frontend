import React from 'react';
import styles from './Stats.module.css';

const HowItWorks = () => {
	return (
		<div className={styles.howItWorks}>
			<h3>How This Works!!!</h3>
			<div className={styles.container}>
				<Section image='/hiw1.png' title='Create'>
					KHUDEGOLPO is a great place to share your creative stories. Discover
					the writing tools you{`'`}ll need to create a storyline.
				</Section>
				<SectionReverse image='/hiw2.png' title='Publish'>
					Publish your writings and as your book grows in popularity build a
					world of loyal audience by creating original stories.
				</SectionReverse>
				<Section image='/hiw3.png' title='Earn'>
					Earn passive income from your unique stories by selling parts of book
					to readers while we generate live analytics on your target audience!
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
		<div className={styles.reverse}>
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
