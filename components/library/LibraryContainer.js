import React, { useEffect, useState } from 'react';
import styles from './Library.module.css';
import PageSelector from '../../admin/PageSelector';
import LoadingInnerPage from '../utilities/page/LoadingInnerPage';
import LoadingContainer from '../utilities/page/LoadingContainer';

const LibraryContainer = ({
	header,
	children,
	page,
	pages,
	setOnPage,
	loading,
	count,
}) => {
	const [total, setTotal] = useState(1);
	const [books, setBooks] = useState();
	useEffect(() => {
		if (!loading && pages != total) {
			setTotal(pages);
		}
	}, [pages]);

	useEffect(() => {
		if (books != count && !loading) {
			setBooks(count);
		}
	}, [count]);

	return (
		<>
			<PageSelector page={page} pages={total} setOnPage={e => setOnPage(e)} />
			<div className={styles.mainContainer}>
				<h5>{`${header}: ${books ? `${books} books` : ''}`}</h5>
				{loading ? (
					<LoadingContainer />
				) : (
					<div className={styles.books}>{children}</div>
				)}
			</div>
			<PageSelector page={page} pages={total} setOnPage={e => setOnPage(e)} />
		</>
	);
};

export default LibraryContainer;
