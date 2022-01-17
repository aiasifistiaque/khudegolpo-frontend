import React from 'react';
import styles from './Intro.module.css';
import DangerButton from '../utilities/button/DangerButton';
import Link from 'next/link';
import Button from '../utilities/button/Button';
import LoadingButton from '../utilities/button/LoadingButton';
import LongButton from '../utilities/button/LongButton';

const Hero = () => {
	return (
		<div className={styles.hero}>
			<div className={styles.heroContentContainer}>
				<div className={styles.heroImageContainer}>
					<img src='/herobook.png' alt='intro' />
				</div>
				<div className={styles.heroHeaders}>
					<h3>READING IS A DISCOUNT TICKET TO EVERYWHERE</h3>
					<p style={{ margin: '1rem 0' }}>
						That{`'`}s the thing about books. They Let you Travel without moving
						your feet.
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
