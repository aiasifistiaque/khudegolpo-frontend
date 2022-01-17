import React, { useEffect, useState } from 'react';
import Page from '../components/utilities/page/Page';
import CreateChapter from '../components/create/chapter/CreateChapter';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../components/utilities/page/LoadingPage';
import getBookAction from '../store/actions/books/getBookAction';

const Addchap = () => {
	const router = useRouter();
	const query = router.query;
	const dispatch = useDispatch();
	const [initLoading, setInitLoading] = useState(true);
	const { book, loading, error } = useSelector(state => state.book);

	useEffect(() => {
		if (query.book != undefined) dispatch(getBookAction(query.book));
	}, [query.book]);

	useEffect(() => {
		if (initLoading && !loading) {
			setInitLoading(false);
		}
	}, [loading]);

	if (initLoading) return <LoadingPage />;

	return (
		<Page>
			<CreateChapter />
		</Page>
	);
};

export default Addchap;
