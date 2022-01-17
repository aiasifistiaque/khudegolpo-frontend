import React from 'react';
import Link from 'next/link';
import styles from './BookInfo.module.css';

const BookAuthor = ({ author }) => {
	const { image, username } = author;
	return (
		<div className={styles.author}>
			<img src={image ? image : '/book/pp.ong'} alt={username} />
			<div className={styles.nameFollow}>
				<Link href={`/u/${username}`}>
					<a>
						<p>by {username}</p>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default BookAuthor;
