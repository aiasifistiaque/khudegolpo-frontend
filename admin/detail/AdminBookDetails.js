import React, { useEffect, useState } from 'react';
import AdminLoading from '../util/AdminLoading';
import useAdminData from '../hooks/useAdminData';
import AdminError from '../util/AdminError';
import { useRouter } from 'next/router';
import DetailContainer from '../DetailContainer';
import DetailLayout from '../DetailLayout';
import DetailItems from '../util/DetailItems';
import SectionLayout from '../SectionLayout';
import ChapterFragment from '../fragments/ChapterFragment';
import useAdminUpdates from '../hooks/useAdminUpdates';
import ErrorText from '../../components/utilities/text/ErrorText';
import SuccessText from '../../components/utilities/text/SuccessText';

const AdminBookDetails = ({ title }) => {
	const [initialize, setInitialze] = useState(false);
	const router = useRouter();
	const { uid } = router.query;

	const { doc, loading, error, success } = useAdminData({
		target: 'book',
		id: uid,
	});
	useEffect(() => {
		if (!loading) {
			setInitialze(true);
		}
	}, [loading]);

	if (!initialize) return <AdminLoading />;
	if (error) return <AdminError />;
	return (
		<DetailLayout>
			<ItemContainer book={doc.doc} />
			{doc.doc.chapters && <ChapterContainer data={doc.doc.chapters} />}
		</DetailLayout>
	);
};

const ItemContainer = ({ book }) => {
	const [editing, setEditing] = useState(false);
	const [data, setData] = useState(book);
	const [status, setStatus] = useState(data.status);
	const [click, setClick] = useState(false);

	const { doc, success, error, loading } = useAdminUpdates({
		value: { status },
		target: 'banbook',
		click,
		id: data._id,
	});

	const on = () => {
		setEditing(true);
		setClick(false);
	};
	const update = () => {
		setClick(true);
		console.log('update');
	};
	const off = () => {
		setEditing(false);
		setStatus(data.status);
		setClick(false);
	};
	useEffect(() => {
		if (!loading) {
			if (error) {
				off();
				setClick(false);
			} else if (success) {
				setEditing(false);
				setClick(false);
				setData(doc);
			}
		}
	}, [loading]);

	return (
		<DetailContainer
			title='Book'
			editable
			on={on}
			off={off}
			editing={editing}
			loading={loading}
			update={update}>
			{error && <ErrorText>{error}</ErrorText>}
			{success && <SuccessText>Updated Successfully</SuccessText>}
			<DetailItems title='Field' head>
				Value
			</DetailItems>
			<DetailItems title='Id'>{data?._id}</DetailItems>
			<DetailItems title='Title'>{data?.title}</DetailItems>
			<DetailItems title='Author' href={`/admin/user?uid=${data?.author?._id}`}>
				{data?.author?.username ? data.author.username : ''}
			</DetailItems>
			<DetailItems title='Chapters'>
				{data?.chapters && data.chapters?.length}
			</DetailItems>
			<DetailItems
				title='Status'
				editing={editing}
				data={['banned', 'published', 'flagged', 'unpublished']}
				value={status}
				onChange={e => setStatus(e)}>
				{data.status}
			</DetailItems>
			<DetailItems title='Genre'>{data.genre}</DetailItems>
			<DetailItems title='Type'>{data.type}</DetailItems>
			<DetailItems title='Earning'>{data.earned} BDT</DetailItems>
			<DetailItems title='Language'>{data.language}</DetailItems>
			<DetailItems title='Rating'>{data.rating}</DetailItems>
			<DetailItems title='Views'>{data.views}</DetailItems>
			<DetailItems title='Created' date>
				{data.createdAt}
			</DetailItems>
		</DetailContainer>
	);
};

const ChapterContainer = ({ data }) => {
	return (
		<DetailContainer>
			<SectionLayout title='Chapters' count={data.length}>
				<ChapterFragment data={data} />
			</SectionLayout>
		</DetailContainer>
	);
};

export default AdminBookDetails;
