import React from 'react';
import styles from './Stats.module.css';
import Button from '../utilities/button/Button';
import Link from 'next/link';

const SecondSlider = () => {
	return (
		<div className={styles.secondSlider}>
			<div className={styles.image}>
				<img src='/secondslider.png' alt='second slider' />
			</div>
			<div className={styles.text}>
				<h5>
					Labarin yarinyar da ta tsani Maza.. cikinsu harda Mahaifinta. Tasha
					alwashin gudanar da tsaftatacciyar rayuwa ba tare da {`'`}Da NAMIJI
					ba. ko hakan zai yiwu?
				</h5>
				<p style={{ textAlign: 'right', color: 'rgba(0,0,0,.6)' }}>
					- Fareeda Abdullah
				</p>
				<Link href='/login'>
					<Button>Start Reading</Button>
				</Link>
			</div>
		</div>
	);
};

export default SecondSlider;
