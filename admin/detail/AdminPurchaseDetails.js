import React, { useEffect, useState } from 'react';
import AdminLoading from '../util/AdminLoading';
import useAdminData from '../hooks/useAdminData';
import AdminError from '../util/AdminError';
import { useRouter } from 'next/router';
import DetailContainer from '../DetailContainer';
import DetailLayout from '../DetailLayout';
import DetailItems from '../util/DetailItems';

const AdminPurchaseDetails = ({ title }) => {
	const [initialize, setInitialze] = useState(false);
	const router = useRouter();
	const { uid } = router.query;

	const { doc, loading, error, success } = useAdminData({
		target: 'unlock',
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
			<ItemContainer data={doc.doc} />
		</DetailLayout>
	);
};

const ItemContainer = ({ data }) => {
	return (
		<DetailContainer title={`Purchase #${data._id}`}>
			<DetailItems title='Field' head>
				Value
			</DetailItems>
			<DetailItems title='Id'>{data._id}</DetailItems>
			<DetailItems title='User' href={`/admin/user?uid=${data.user._id}`}>
				{data.user.username}
			</DetailItems>
			<DetailItems title='User Email'>{data.user.email}</DetailItems>
			<DetailItems title='Book' href={`/admin/book?uid=${data.book._id}`}>
				{data.book.title}
			</DetailItems>
			<DetailItems
				title='Chapter'
				href={`/admin/chapter?uid=${data.chapter._id}`}>
				{data.chapter.title}
			</DetailItems>
			<DetailItems title='Author' href={`/admin/user?uid=${data.author._id}`}>
				{data.author.username}
			</DetailItems>
			<DetailItems title='Price'>{data.price} BDT</DetailItems>
			<DetailItems title='Purchase Date' date>
				{data.createdAt}
			</DetailItems>
		</DetailContainer>
	);
};

export default AdminPurchaseDetails;
