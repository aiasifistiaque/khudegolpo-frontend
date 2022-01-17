import React, { useEffect, useState } from 'react';
import Page from '../components/utilities/page/Page';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import getBookAction from '../store/actions/books/getBookAction';
import LoadingPage from '../components/utilities/page/LoadingPage';
import PageError from '../components/utilities/page/PageError';
import EditBook from '../components/create/book/EditBook';

const Editbook = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { book, loading, error, viewer } = useSelector(state => state.book);
	const { id } = router.query;
	const [initLoading, setInitLoading] = useState(true);

	useEffect(() => {
		if (id != undefined) dispatch(getBookAction(id));
	}, [id]);

	useEffect(() => {
		if (initLoading && !loading && book) {
			setInitLoading(false);
		}
	}, [loading, book]);

	if (initLoading) return <LoadingPage />;
	else if (viewer != 'self' || error) return <PageError />;
	else
		return (
			<Page>
				<EditBook book={book} />
			</Page>
		);
};

export default Editbook;
