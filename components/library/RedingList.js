import React, { useEffect, useState } from 'react';
import styles from './Library.module.css';
import LibraryContainer from './LibraryContainer';
import { useDispatch, useSelector } from 'react-redux';
import myWritingsAction from '../../store/actions/library/myWritingsAction';
import LoadingInnerPage from '../utilities/page/LoadingInnerPage';
import ErrorPage from '../utilities/page/ErrorPage';
import LibraryBook from './LibraryBook';

const RedingList = ({ header }) => {
	const dispatch = useDispatch();
	const [initLoading, setInitLoading] = useState(true);
	const { books, loading, error } = useSelector(state => state.writings);

	useEffect(() => {
		dispatch(myWritingsAction());
	}, []);

	useEffect(() => {
		!loading && initLoading && books && setInitLoading(false);
	}, [loading]);

	if (initLoading) return <LoadingInnerPage />;
	else if (error) return <ErrorPage />;
	else
		return (
			<LibraryContainer header={header}>
				{books && books.map((book, i) => <LibraryBook book={book} key={i} />)}
			</LibraryContainer>
		);
};

export default RedingList;
