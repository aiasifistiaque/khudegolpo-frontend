import React, { useState, useEffect } from 'react';
import styles from './Library.module.css';
import MyLibrary from './MyLibrary';
import MyWritings from './MyWritings';
import PublishedBooks from './PublishedBooks';

const Library = () => {
	const [select, setSelect] = useState(0);

	return (
		<div className={styles.layout}>
			<h5>My Library</h5>
			<div className={styles.options}>
				<Option
					selected={select == 0 ? true : false}
					onClick={() => setSelect(0)}>
					Reading List
				</Option>
				<Option
					selected={select == 1 ? true : false}
					onClick={() => setSelect(1)}>
					Writings
				</Option>
				<Option
					selected={select == 2 ? true : false}
					onClick={() => setSelect(2)}>
					Published
				</Option>
				<Option
					selected={select == 3 ? true : false}
					onClick={() => setSelect(3)}>
					Archive
				</Option>
			</div>
			{select == 0 ? (
				<MyLibrary header='Reading List' />
			) : select == 1 ? (
				<MyWritings header='My Writings' />
			) : select == 2 ? (
				<PublishedBooks header='My Published Stories' />
			) : (
				select == 3 && 'Archived Storied'
			)}
		</div>
	);
};

const Option = ({ children, selected, onClick }) => {
	return (
		<div
			className={
				selected ? `${styles.option} ${styles.selected}` : styles.option
			}
			onClick={onClick}>
			{children}
		</div>
	);
};

export default Library;
