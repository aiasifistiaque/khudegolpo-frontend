import React, { useEffect, useState } from 'react';
import AdminLoading from '../util/AdminLoading';
import useAdminData from '../hooks/useAdminData';
import AdminError from '../util/AdminError';
import { useRouter } from 'next/router';
import DetailContainer from '../DetailContainer';
import DetailLayout from '../DetailLayout';
import DetailItems from '../util/DetailItems';
import ErrorText from '../../components/utilities/text/ErrorText';
import SuccessText from '../../components/utilities/text/SuccessText';
import useAdminUpdates from '../hooks/useAdminUpdates';

const AdminChapterDetails = ({ title }) => {
	const [initialize, setInitialze] = useState(false);
	const router = useRouter();
	const { uid } = router.query;

	const { doc, loading, error, success } = useAdminData({
		target: 'chapter',
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
			<ItemContainer initialValue={doc.doc} />
		</DetailLayout>
	);
};

const ItemContainer = ({ initialValue }) => {
	const [editing, setEditing] = useState(false);
	const [data, setData] = useState(initialValue);
	const [status, setStatus] = useState(data.status);
	const [click, setClick] = useState(false);

	const { doc, success, error, loading } = useAdminUpdates({
		value: { status },
		target: 'banchapter',
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
			title='Chapter'
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
			<DetailItems title='Id'>{data._id}</DetailItems>
			<DetailItems title='Title'>{data.title}</DetailItems>
			<DetailItems title='Book' href={`/admin/book?uid=${data.book._id}`}>
				{data.book.title}
			</DetailItems>
			<DetailItems
				title='Author'
				href={`/admin/user?uid=${data.book.author._id}`}>
				{data.book.author.username}
			</DetailItems>
			<DetailItems title='Type'>{data.paid ? 'Paid' : 'Free'}</DetailItems>
			<DetailItems title='Price'>{data.price} BDT</DetailItems>
			<DetailItems title='Earning'>{data.earning} BDT</DetailItems>
			<DetailItems
				title='Status'
				title='Status'
				editing={editing}
				data={['published', 'unpublished', 'flagged', 'banned', 'deleted']}
				value={status}
				onChange={e => setStatus(e)}>
				{data.status}
			</DetailItems>{' '}
			<DetailItems title='Views'>{data.views}</DetailItems>
			<DetailItems title='Created' date>
				{data.createdAt}
			</DetailItems>
		</DetailContainer>
	);
};

export default AdminChapterDetails;
