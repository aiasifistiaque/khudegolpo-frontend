import React from 'react';
import styles from './LockedChapter.module.css';
import BlueText from '../../utilities/text/BlueText';
import Link from 'next/link';
import countWords from '../../../functions/countWords';
import toK from '../../../functions/toK';

const LockedBookInfo = ({ chapter, onAlertClick }) => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<Link href={`/book?id=${chapter.book._id}`}>
					<a>
						<h5>{chapter.book.title}</h5>
					</a>
				</Link>

				<h6>{chapter.book.author && chapter.book.author.name}</h6>
			</div>
			<div className={styles.main}>
				<div className={styles.info}>
					<div className={styles.image}>
						<img
							src={chapter.book.image ? chapter.book.image : '/book/book.ong'}
							alt={chapter.book.title}
						/>
					</div>
					<div className={styles.text}>
						<h5>Chapter: {chapter.title}</h5>
						<div className={styles.details}>
							<p>views: {chapter.views}</p>

							<p>words: {toK(countWords(chapter.description))}</p>
						</div>

						<BlueText>
							by{' '}
							{chapter.book.author &&
								chapter.book.author.name &&
								chapter.book.author.name}
						</BlueText>
					</div>
				</div>
				<div className={styles.buy}>
					<div className={styles.lockIcon}>
						<img src='/icons/lock.png' alt='lock' />
					</div>

					<p>
						Continue reading this story to show your support for{' '}
						{chapter.book.author &&
							chapter.book.author.name &&
							chapter.book.author.name}
					</p>
					<BlueText>
						Unlock this chapter of the storyline, to continue your awaiting
						journey into this amazing book
					</BlueText>
					<div className={styles.unlock} onClick={onAlertClick}>
						<p className={styles.price}>{chapter.price} BDT</p>
						<p className={styles.open}>Unlock this part</p>
					</div>
					<BlueText>
						This story contains total {toK(countWords(chapter.description))}{' '}
						words
					</BlueText>
				</div>
			</div>
		</div>
	);
};

export default LockedBookInfo;
