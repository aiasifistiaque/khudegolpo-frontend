import React from 'react';
import styles from './Library.module.css';
import Link from 'next/link';
import { SmallTag } from '../utilities/tags/SmallTag';

const LibraryBook = ({ book }) => {
	return (
		<Link href={`/book?id=${book._id}`}>
			<div className={styles.book}>
				<img src={book.image} alt={book.title} />
				<p>{book.title}</p>
				{book.status == 'published' ? (
					<SmallTag>{book.status}</SmallTag>
				) : (
					<SmallTag red>{book.status}</SmallTag>
				)}
			</div>
		</Link>
	);
};

export default LibraryBook;
