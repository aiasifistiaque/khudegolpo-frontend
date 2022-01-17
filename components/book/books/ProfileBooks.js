import React from 'react';
import styles from './Books.module.css';
import Link from 'next/link';

const ProfileBooks = ({ books }) => {
	return (
		<div className={styles.listContainer} style={{ margin: '3rem 0' }}>
			<h5>Books</h5>
			<div
				className={styles.booksContainer}
				style={{ justifyContent: 'space-evenly' }}>
				{books?.map(book => (
					<Book key={book._id} book={book} />
				))}
			</div>
		</div>
	);
};

const Book = ({ book }) => {
	return (
		<Link href={`/book?id=${book && book._id}`}>
			<div className={styles.profileItem}>
				<img
					src={book?.image ? book.image : '/book/book.png'}
					alt={book && book.title}
				/>
				<div className={styles.text}>
					<p>{book && book.title}</p>
				</div>
			</div>
		</Link>
	);
};

export default ProfileBooks;
