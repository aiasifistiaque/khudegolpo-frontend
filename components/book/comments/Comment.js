import React from 'react';
import styles from './BookComments.module.css';
import DateText from '../../utilities/text/DateText';
import Link from 'next/link';

const Comment = ({ name, children, image, date }) => {
	return (
		<div className={styles.commentBox}>
			<div className={styles.image}>
				<img src={image} alt={children} />
			</div>
			<div>
				<div className={styles.text}>
					<Link href={`/u/${name}`}>
						<a>{name}</a>
					</Link>

					<p>{children}</p>
				</div>
				<DateText style={{ padding: '0 1rem' }}>{date}</DateText>
			</div>
		</div>
	);
};

export default Comment;
