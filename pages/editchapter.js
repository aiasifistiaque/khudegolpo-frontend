import React, { useEffect, useState } from 'react';
import Page from '../components/utilities/page/Page';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../components/utilities/page/LoadingPage';
import getChapterAction from '../store/actions/books/getChapterAction';
import EditChapter from '../components/create/chapter/EditChapter';

const EditChap = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [initLoading, setInitLoading] = useState(true);
	const { chapter, loading, error } = useSelector(state => state.chapter);
	const { id } = router.query;

	useEffect(() => {
		if (id != undefined) dispatch(getChapterAction(id));
	}, [id]);

	useEffect(() => {
		if (initLoading && !loading) {
			setInitLoading(false);
		}
	}, [loading, chapter]);

	if (initLoading) return <LoadingPage />;

	return (
		<Page>
			<EditChapter />
		</Page>
	);
};

export default EditChap;
