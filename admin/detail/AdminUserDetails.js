import React, { useEffect, useState } from 'react';
import SectionLayout from '../SectionLayout';
import AdminItemRow from '../util/AdminItemRow';
import AdminItem from '../util/AdminItem';
import AdminLoading from '../util/AdminLoading';
import useAdminData from '../hooks/useAdminData';
import AdminError from '../util/AdminError';
import { useRouter } from 'next/router';
import DetailContainer from '../DetailContainer';
import DetailLayout from '../DetailLayout';
import DetailItems from '../util/DetailItems';
import RefillFragment from '../fragments/RefillFragment';
import PurchaseFragment from '../fragments/PurchaseFragment';
import WithdrawFragment from '../fragments/WithdrawFragment';
import useAdminUpdates from '../hooks/useAdminUpdates';
import ErrorText from '../../components/utilities/text/ErrorText';
import SuccessText from '../../components/utilities/text/SuccessText';

const AdminUserDetails = ({ title }) => {
	const [initialize, setInitialze] = useState(false);
	const router = useRouter();
	const { uid } = router.query;

	const { doc, loading, error, success } = useAdminData({
		target: 'user',
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
			<UserContainer data={doc.doc} />
			<BooksContainer data={doc.books} />
			<BookPurchases data={doc.unlocks} />
			<UserRefills data={doc.refills} />
			<UserWithdraws data={doc.withdraws} />
		</DetailLayout>
	);
};

const UserContainer = ({ data }) => {
	const [editing, setEditing] = useState(false);
	const [user, setUser] = useState(data);
	const [role, setRole] = useState(user.role);
	const [earning, setEarning] = useState(user.earning);
	const [walletBalance, setWalletBalance] = useState(user.walletBalance);

	const [click, setClick] = useState(false);

	const { doc, success, error, loading } = useAdminUpdates({
		value: { role },
		target: 'userrole',
		click,
		id: user._id,
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
		setEarning(user.earning);
		setWalletBalance(user.walletBalance);
		setRole(user.role);
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
				setUser(doc);
			}
		}
	}, [loading]);

	return (
		<DetailContainer
			title='User'
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
			<DetailItems title='Id'>{user._id}</DetailItems>
			<DetailItems title='Name'>{user.name}</DetailItems>
			<DetailItems title='Username'>{user.username}</DetailItems>
			<DetailItems title='Email'>{user.email}</DetailItems>
			<DetailItems
				title='Role'
				editing={editing}
				data={['user', 'admin', 'banned']}
				value={role}
				onChange={e => setRole(e)}>
				{user.role}
			</DetailItems>
			<DetailItems
				title='Earning'
				//editing={editing}
				amount
				value={earning}
				onChange={e => setEarning(e)}>
				{user.earning}
			</DetailItems>
			<DetailItems
				title='Balance'
				//editing={editing}
				amount
				value={walletBalance}
				onChange={e => setWalletBalance(e)}>
				{user.walletBalance}
			</DetailItems>
			<DetailItems title='Followers'>{user.followers} </DetailItems>
			<DetailItems title='Following'>{user.followings}</DetailItems>{' '}
			<DetailItems title='Joined' date>
				{user.createdAt}
			</DetailItems>
			<DetailItems title='Updated' date>
				{user.updatedAt}
			</DetailItems>
		</DetailContainer>
	);
};

const BooksContainer = ({ data }) => {
	return (
		<DetailContainer>
			<SectionLayout title='Books' count={data.length}>
				<AdminItemRow>
					<AdminItem title>Title</AdminItem>
					<AdminItem title>Chapters</AdminItem>
					<AdminItem title>Platform</AdminItem>
					<AdminItem title>Status</AdminItem>
					<AdminItem title link>
						View
					</AdminItem>
				</AdminItemRow>
				{data.map((item, i) => (
					<AdminItemRow key={i}>
						<AdminItem>{item.title}</AdminItem>
						<AdminItem>{item.chapters ? item.chapters.length : 0}</AdminItem>
						<AdminItem>{item.platform}</AdminItem>
						<AdminItem>{item.status}</AdminItem>
						<AdminItem link href={`/admin/book?uid=${item._id}`}>
							View
						</AdminItem>
					</AdminItemRow>
				))}
			</SectionLayout>
		</DetailContainer>
	);
};

const BookPurchases = ({ data }) => {
	return (
		<DetailContainer>
			<SectionLayout title='Purchases' count={data.length}>
				<PurchaseFragment data={data} sort={() => {}} />
			</SectionLayout>
		</DetailContainer>
	);
};

const UserRefills = ({ data }) => {
	return (
		<DetailContainer>
			<SectionLayout title='Refills' count={data.length}>
				<RefillFragment data={data} sort={() => {}} />
			</SectionLayout>
		</DetailContainer>
	);
};

const UserWithdraws = ({ data }) => {
	return (
		<DetailContainer>
			<SectionLayout title='Withdraws' count={data.length}>
				<WithdrawFragment data={data} sort={() => {}} />
			</SectionLayout>
		</DetailContainer>
	);
};

export default AdminUserDetails;
