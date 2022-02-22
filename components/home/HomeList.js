import React from 'react';
import styles from './Home.module.css';
import SubHeading from '../utilities/text/SubHeading';
import Button from '../utilities/button/Button';
import CenterContainer from '../utilities/container/CenterContainer';
import Link from 'next/link';

const HomeList = () => {
	return (
		<div className={styles.homelist}>
			<h5>Text</h5>
			<SubHeading>Sample caption</SubHeading>
			<div className={styles.books}>
				<BookLink />
				<BookLink />
				<BookLink />
				<BookLink />
				<BookLink />
			</div>
			<CenterContainer>
				<Button>View All</Button>
			</CenterContainer>
		</div>
	);
};

const BookLink = () => {
	return (
		<Link href='/book?id=61430257d2a09f8955de4b0a'>
			<img
				src='https://Khude Golpo.s3.us-east-2.amazonaws.com/1635370612372_book2.jpg'
				alt='book one'
				className={styles.sectionbooks}
			/>
		</Link>
	);
};

export default HomeList;
