import React, { useEffect } from 'react';
import styles from './Books.module.css';
import { useRouter } from 'next/router';
import useRecentBooks from '../../../hooks/useRecentBooks';
import Link from 'next/link';

const PaidBooksList = () => {
	const router = useRouter();
	const { id } = router.query;
	const { books, loading, error } = useRecentBooks(`genre=${id}&paid=paid`);

	useEffect(() => {
		console.log(id);
		console.log(books);
	}, [loading]);

	return (
		<div className={styles.paidContainer}>
			<h5>Paid Books</h5>
			{loading ? (
				<ThisText>Loading...</ThisText>
			) : books.length < 1 ? (
				<ThisText>No Paid books in this genre</ThisText>
			) : (
				// <div className={styles.paidBooks}>
				// 	{books.map((book, i) =>
				// 		i < 5 ? <Book book={book} key={i} /> : i == 5 && <More key={i} />
				// 	)}
				// </div>
				<div className={styles.paidBooks}>
					{books.map((book, i) => (
						<Book book={book} key={i} />
					))}
				</div>
			)}
		</div>
	);
};

const Book = ({ book }) => {
	return (
		<Link href={`/book?id=${book._id}`}>
			<div className={styles.paidBook}>
				<img
					src={book.image ? book.image : '/book/book.png'}
					alt={book.title}
				/>
			</div>
		</Link>
	);
};

const More = () => {
	return (
		<div className={styles.paidBook}>
			<img src={'/book/viewmore.png'} alt='more' />
		</div>
	);
};

const ThisText = ({ children }) => {
	return <p style={{ margin: '.5rem 0' }}>{children}</p>;
};

export default PaidBooksList;
