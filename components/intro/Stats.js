import React from 'react';
import styles from './Stats.module.css';

const Stats = ({ doc }) => {
	return (
		<div className={styles.stats}>
			<Item title={doc.books}>Books</Item>
			<Item title={doc.chapters}>Chapters</Item>
			<Item title={doc.authors}>Authors</Item>
			<Item title={doc.users}>Readers</Item>
		</div>
	);
};

const Item = ({ title, children }) => {
	return (
		<div className={styles.stat}>
			<h5>{title}</h5>
			<p>{children}</p>
		</div>
	);
};

export default Stats;
