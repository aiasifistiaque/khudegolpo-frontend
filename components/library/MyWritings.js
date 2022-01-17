import React, { useEffect, useState } from 'react';
import styles from './Library.module.css';
import LibraryContainer from './LibraryContainer';
import { useDispatch, useSelector } from 'react-redux';
import myWritingsAction from '../../store/actions/library/myWritingsAction';
import LoadingInnerPage from '../utilities/page/LoadingInnerPage';
import ErrorPage from '../utilities/page/ErrorPage';
import LibraryBook from './LibraryBook';

const MyWritings = ({ header }) => {
	const dispatch = useDispatch();
	const [initLoading, setInitLoading] = useState(true);
	const { books, loading, error, page, pages, count } = useSelector(
		state => state.writings
	);

	const [onPage, setOnPage] = useState(page ? page : 1);

	useEffect(() => {
		dispatch(myWritingsAction(`page=${onPage}`));
	}, [onPage]);

	useEffect(() => {
		!loading && initLoading && books && setInitLoading(false);
	}, [loading]);

	if (initLoading) return <LoadingInnerPage />;
	else if (error) return <ErrorPage />;
	else
		return (
			<LibraryContainer
				header={header}
				page={onPage}
				pages={pages}
				loading={loading}
				setOnPage={e => setOnPage(e)}
				count={count}>
				{books && books.map((book, i) => <LibraryBook book={book} key={i} />)}
			</LibraryContainer>
		);
};

export default MyWritings;
