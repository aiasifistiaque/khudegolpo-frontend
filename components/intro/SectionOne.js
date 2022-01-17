import React from 'react';
import styles from './Stats.module.css';
import Button from '../utilities/button/Button';
import OutlinedButton from '../utilities/button/OutlinedButton';
import Link from 'next/link';
import { colors } from '../../constants/styles';

const SectionOne = () => {
	return (
		<div className={styles.sectionone}>
			<div className={styles.image}>
				<img src='/homesection1.png' alt='section one' />
			</div>
			<div className={styles.text}>
				<h4 style={{ color: colors.primary, fontWeight: '700' }}>AREWABOOKS</h4>
				<p>The Largest African social storytelling platform</p>
				<p>
					Along the magic of stories, Arewabooks brings together of writers and
					readers community.
				</p>
				<Link href='/login'>
					<OutlinedButton>Start Reading</OutlinedButton>
				</Link>
				<Link href='/login'>
					<Button>Start Writing</Button>
				</Link>
			</div>
		</div>
	);
};

export default SectionOne;
