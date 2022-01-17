import React from 'react';
import styles from './Books.module.css';
import textShorten from '../../../functions/textShorten';
import Link from 'next/link';

const Books = ({ books, title }) => {
	return (
		<div className={styles.listContainer}>
			<h5>{title ? title : 'Free Books'}</h5>
			<div className={styles.booksContainer}>
				{books.map(book => (
					<Book key={book._id} book={book} />
				))}
			</div>
		</div>
	);
};

const Book = ({ book }) => {
	const description = textShorten(book?.description, 100);
	return (
		<div className={styles.item}>
			<Link href={`/book?id=${book && book._id}`}>
				<img
					src={(book && book.image && book.image) || '/book/book.png'}
					alt={book && book.title}
				/>
			</Link>

			<div className={styles.text}>
				<Link href={`/book?id=${book && book._id}`}>
					<h5>{book && book.title}</h5>
				</Link>
				<Link href={`/u/${book.author.username}`}>
					<a className={styles.author}>by {book?.author?.username}</a>
				</Link>
				<div
					dangerouslySetInnerHTML={{ __html: description }}
					style={{ marginTop: 8 }}
				/>

				<Link href={`/book?id=${book && book._id}`}>
					<a>More details...</a>
				</Link>
			</div>
		</div>
	);
};

export default Books;
