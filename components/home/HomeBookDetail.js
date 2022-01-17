import React from 'react';
import styles from './Home.module.css';
import TextButton from '../utilities/button/TextButton';
import Tags from '../utilities/button/Tags';
import Link from 'next/link';

const HomeBookDetail = ({ book }) => {
	if (!book) return null;
	return (
		<div className={styles.homeBookDetail}>
			<Link href={`/book?id=${book._id}`}>
				<img
					src={book && book.image ? book.image : '/book2.png'}
					alt={book.title}
					className={styles.sectionbooks}
				/>
			</Link>

			<div className={styles.bookDetails}>
				<Link href={`/book?id=${book._id}`}>
					<a>{book.title}</a>
				</Link>

				<div
					dangerouslySetInnerHTML={{ __html: book.description }}
					className={styles.mainText}
				/>
				<div className={styles.tagContainer}>
					{book.tags &&
						book.tags.map((tag, i) =>
							i < 4 ? (
								<Tags key={i}>{tag}</Tags>
							) : (
								i == 5 && (
									<p className={styles.more}>+{book.tags.length - 5} more</p>
								)
							)
						)}
				</div>

				{/* <Link href={`/book?id=${book._id}`}>
					<a>More Details...</a>
				</Link> */}
			</div>
		</div>
	);
};

export default HomeBookDetail;
