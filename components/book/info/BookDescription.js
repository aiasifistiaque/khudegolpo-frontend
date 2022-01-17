import React from 'react';
import styles from './BookInfo.module.css';
import Link from 'next/link';

const BookDescription = ({ book, viewer }) => {
	return (
		<div className={styles.description}>
			<div className={styles.descriptionTags}>
				<Link href={`/genre?id=${book.genre}`}>
					<p className={styles.genre} style={{ cursor: 'pointer' }}>
						Genre: {book.genre}
					</p>
				</Link>
				{(book.rating == 'adult' || book.rating == 'mature') && (
					<p className={styles.adult}>Mature +17</p>
				)}
				<p className={styles.bookType} style={{ textTransform: 'capitalize' }}>
					{book.type} Book
				</p>
				{viewer == 'self' && <p className={styles.bookType}>{book.status}</p>}
				<p className={styles.bookType}>
					Available: {book.platform != 'app only' ? 'App & WebApp' : 'App Only'}
				</p>
				{book.rating == 'Adult' && <p className={styles.bookType}>18+</p>}
			</div>

			<div
				dangerouslySetInnerHTML={{ __html: book.description }}
				className={styles.bookDescription}
			/>
			<div className={styles.tagContainer}>
				{book.tags.map((tag, i) => (
					<div className={styles.tags} key={i}>
						<p>{tag}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default BookDescription;
