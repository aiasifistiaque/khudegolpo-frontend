import React, { useEffect, useState } from 'react';
import styles from './Library.module.css';
import LibraryContainer from './LibraryContainer';
import { useDispatch, useSelector } from 'react-redux';
import LoadingInnerPage from '../utilities/page/LoadingInnerPage';
import ErrorPage from '../utilities/page/ErrorPage';
import LibraryBook from './LibraryBook';
import myLibraryAction from '../../store/actions/library/myLibraryAction';
import PageSelector from '../../admin/PageSelector';

const MyLibrary = ({ header }) => {
	const dispatch = useDispatch();
	const [initLoading, setInitLoading] = useState(true);
	const { books, loading, error, page, pages, count } = useSelector(
		state => state.library
	);

	const [onPage, setOnPage] = useState(page ? page : 1);

	useEffect(() => {
		dispatch(myLibraryAction(`page=${onPage}`));
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
				setOnPage={e => setOnPage(e)}
				loading={loading}
				count={count}>
				{books &&
					books.map((book, i) => <LibraryBook book={book.book} key={i} />)}
			</LibraryContainer>
		);
};

export default MyLibrary;
