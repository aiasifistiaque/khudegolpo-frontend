import React from 'react';
import styles from './Recommendations.module.css';
import Link from 'next/link';
import useRecentBooks from '../../../hooks/useRecentBooks';

const Recommendations = ({ genre }) => {
	const { books, loading, error } = useRecentBooks(
		`sort=popular&type=home&genre=${genre}`
	);
	if (loading) return null;
	return (
		<div className={styles.recommendations}>
			<h5>Recommendations</h5>

			<div className={styles.cardContainer}>
				{books.map((book, i) => i < 6 && <BookLink book={book} key={i} />)}
			</div>
		</div>
	);
};

const BookLink = ({ book }) => {
	return (
		<Link href={`/book?id=${book._id}`}>
			<img src={book.image ? book.image : '/book.png'} alt={book.title} />
		</Link>
	);
};

export default Recommendations;
