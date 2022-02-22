import React from 'react';
import Link from 'next/link';
import styles from './Home.module.css';

const BookLink = ({ book }) => {
	return (
		<Link href={`/book?id=${book._id}`}>
			<div className={styles.sectionBooks}>
				<img
					src={
						book.image
							? book.image
							: 'https://Khude Golpo.s3.us-east-2.amazonaws.com/1635370612372_book2.jpg'
					}
					alt={book.title}
				/>
				<p>{book.title}</p>
			</div>
		</Link>
	);
};

export default BookLink;
