import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Page from '../components/utilities/page/Page';
import LockedChapter from '../components/book/locked/LockedChapter';
import getChapterAction from '../store/actions/books/getChapterAction';
import LoadingPage from '../components/utilities/page/LoadingPage';

const LockedChap = () => {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useDispatch();
	const [initLoading, setInitLoading] = useState(true);
	const { chapter, loading, error } = useSelector(state => state.chapter);

	useEffect(() => {
		if (id != undefined) {
			dispatch(getChapterAction(id));
		}
	}, [id]);

	useEffect(() => {
		if (initLoading && !loading && chapter) {
			setInitLoading(false);
		}
	}, [loading]);
	if (initLoading) return <LoadingPage />;

	return (
		<Page>
			<LockedChapter chapter={chapter} />
		</Page>
	);
};

export default LockedChap;
