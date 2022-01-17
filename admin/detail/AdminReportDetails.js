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

const AdminReportDetails = ({ title }) => {
	const [initialize, setInitialze] = useState(false);
	const router = useRouter();
	const { uid } = router.query;

	const { doc, loading, error, success } = useAdminData({
		target: 'report',
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
		target: 'report',
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
			title={`Report`}
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
			<DetailItems title='User'>{data.user.username}</DetailItems>
			<DetailItems title='Category'>{data.category} NGN</DetailItems>
			<DetailItems title='Type'>{data.type}</DetailItems>
			<DetailItems title='Target'>{data.target}</DetailItems>
			<DetailItems
				title='Status'
				editing={editing}
				data={[
					'requested',
					'resolved',
					'processing',
					'pending',
					'rejected',
					'completed',
					'banned',
				]}
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

export default AdminReportDetails;
