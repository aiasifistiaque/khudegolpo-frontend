import React from 'react';
import styles from './Intro.module.css';
import Link from 'next/link';
import Button from '../utilities/button/Button';

const Hero = () => {
	return (
		<div className={styles.hero}>
			<div className={styles.heroContentContainer}>
				<div className={styles.heroImageContainer}>
					<img src='/herobook.png' alt='intro' />
				</div>
				<div className={styles.heroHeaders}>
					<h3>WE CONNECT READERS {`&`} WRITERS</h3>
					<p style={{ margin: '1rem 0' }}>
						A social platform to read, publish {`&`} earn from original stories.
					</p>
					<div>
						<Link href='/login'>
							<Button danger>Start Reading</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
