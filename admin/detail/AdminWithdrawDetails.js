import React, { useEffect, useState } from 'react';
import AdminLoading from '../util/AdminLoading';
import useAdminData from '../hooks/useAdminData';
import AdminError from '../util/AdminError';
import { useRouter } from 'next/router';
import DetailContainer from '../DetailContainer';
import DetailLayout from '../DetailLayout';
import DetailItems from '../util/DetailItems';
import useAdminUpdates from '../hooks/useAdminUpdates';
import ErrorText from '../../components/utilities/text/ErrorText';
import SuccessText from '../../components/utilities/text/SuccessText';

const AdminWithdrawDetails = ({ title }) => {
	const [initialize, setInitialze] = useState(false);
	const router = useRouter();
	const { uid } = router.query;

	const { doc, loading, error, success } = useAdminData({
		target: 'withdraw',
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
		target: 'withdraw',
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
			title='Withdraw'
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
			<DetailItems title='User' href={`/admin/user?uid=${data.user._id}`}>
				{data.user.username}
			</DetailItems>
			<DetailItems title='User Email'>{data.user.email}</DetailItems>
			<DetailItems title='Amount'>{data.amount} BDT</DetailItems>
			<DetailItems title='Name'>{data.name}</DetailItems>
			<DetailItems title='Account No'>{data.account}</DetailItems>
			<DetailItems title='Bank'>{data.bank}</DetailItems>
			<DetailItems title='Branch'>{data.branch}</DetailItems>
			<DetailItems
				title='Status'
				editing={editing}
				data={
					status == 'successful'
						? ['successful', 'reported']
						: [
								'requested',
								'processing',
								'successful',
								'cancelled',
								'rejected',
								'refunded',
						  ]
				}
				value={status}
				onChange={e => setStatus(e)}>
				{data.status}
			</DetailItems>
			<DetailItems title='Created' date>
				{data.createdAt}
			</DetailItems>
		</DetailContainer>
	);
};

export default AdminWithdrawDetails;
