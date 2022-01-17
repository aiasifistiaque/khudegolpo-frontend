import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import styles from './Home.module.css';
import { useRouter } from 'next/router';
import useCovers from '../../hooks/useCovers';

const HomeCover = () => {
	const router = useRouter();
	const { doc, loading, error } = useCovers();
	const [compArray, setCompArray] = useState([]);

	useEffect(() => {
		console.log(doc);
		if (!loading && doc) {
			let arr = [];
			doc.map((item, i) =>
				arr.push(
					<HeroOne
						key={i + 1}
						src={item.src}
						onClick={() => router.push(`/book?id=${item.href}`)}
					/>
				)
			);
			setCompArray(arr);
		}
	}, [loading]);

	const [index, setIndex] = useState(0);

	const [reverse, setReverse] = useState(false);

	const transitions = useTransition(index, {
		keys: index,
		initial: {
			opacity: 1,
			//transform: `translateX(0px)`
		},
		from: {
			opacity: 0,
			//transform: reverse ? `translateX(-100%)` : `translateX(100%)`,
		},
		enter: {
			opacity: 1,
			//transform: 'translateX(0%)'
		},
		leave: {
			opacity: 0,
			//transform: reverse ? `translateX(100%)` : `translateX(-100%)`,
		},
		delay: 1000,
		config: { duration: 600 },
	});

	useEffect(() => {
		setInterval(function () {
			setReverse(false);
			setIndex(state => (state + 1) % 3);
		}, 7000);
	}, []);

	const next = () => {
		setReverse(false);
		setIndex(state => (state + 1) % 3);
	};

	const prev = () => {
		setReverse(true);
		if (index == 0) {
			setIndex(2);
		} else {
			setIndex(state => state - 1);
		}
	};

	return (
		<>
			{transitions((style, i) => (
				<animated.div
					key={i}
					style={{
						backgroundColor: 'white',
						position: 'absolute',
						width: '100%',
						...style,
					}}>
					{compArray[i]}
				</animated.div>
			))}
		</>
	);
};

const HeroOne = ({ key, src, onClick }) => {
	return (
		<div className={styles.heroContainer}>
			<img src={`${src}`} alt='slider' onClick={onClick} />
		</div>
	);
};

export default HomeCover;
