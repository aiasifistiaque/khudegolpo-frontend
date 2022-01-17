import React, { useEffect, useState } from 'react';
import AdminHeader from '../../admin/header/AdminHeader';
import AdminLayout from '../../admin/AdminLayout';
import AdminUsers from '../../admin/users/AdminUsers';
import { useRouter } from 'next/router';
import AdminRefills from '../../admin/users/AdminRefills';
import AdminWithdraws from '../../admin/users/AdminWithdraws';
import AdminPurchases from '../../admin/users/AdminPurchases';
import AdminReports from '../../admin/users/AdminReports';
import AdminBooks from '../../admin/users/AdminBooks';
import AdminPaidBooks from '../../admin/users/AdminPaidBooks';
import AdminUserDetails from '../../admin/detail/AdminUserDetails';
import AdminBookDetails from '../../admin/detail/AdminBookDetails';
import AdminWithdrawDetails from '../../admin/detail/AdminWithdrawDetails';
import AdminRefillDetails from '../../admin/detail/AdminRefillDetails';
import AdminReportDetails from '../../admin/detail/AdminReportDetails';
import AdminPurchaseDetails from '../../admin/detail/AdminPurchaseDetails';
import AdminChapterDetails from '../../admin/detail/AdminChapterDetails';
import AdminInfoDetails from '../../admin/detail/AdminInfoDetails';
import { useDispatch, useSelector } from 'react-redux';
import getProfileAction from '../../store/actions/auth/getProfileAction';

const Admin = () => {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useDispatch();
	const [init, setInit] = useState(false);
	const [initLoading, setInitLoading] = useState(true);
	const { loading, user } = useSelector(state => state.user);

	useEffect(() => {
		dispatch(getProfileAction());
		setInit(true);
	}, []);

	useEffect(() => {
		if (!loading && init) setInitLoading(false);
	}, [loading]);

	useEffect(() => {
		if (!initLoading) {
			if (user.role != 'admin') {
				router.replace('/404');
			}
		}
	}, [initLoading]);

	if (initLoading) return null;
	if (user?.role != 'admin') return null;
	return (
		<div>
			<AdminLayout>
				{id == 'users' ? (
					<AdminUsers title='Users' />
				) : id == 'refills' ? (
					<AdminRefills title='Refill requests' />
				) : id == 'withdraws' ? (
					<AdminWithdraws title='Withdraw requests' />
				) : id == 'purchases' ? (
					<AdminPurchases title='Book Purchases' />
				) : id == 'reports' ? (
					<AdminReports title='Reports' />
				) : id == 'books' ? (
					<AdminBooks title='Books' />
				) : id == 'paidbooks' ? (
					<AdminPaidBooks title='Paid Books' />
				) : id == 'user' ? (
					<AdminUserDetails />
				) : id == 'book' ? (
					<AdminBookDetails />
				) : id == 'withdraw' ? (
					<AdminWithdrawDetails />
				) : id == 'refill' ? (
					<AdminRefillDetails />
				) : id == 'report' ? (
					<AdminReportDetails />
				) : id == 'purchase' ? (
					<AdminPurchaseDetails />
				) : id == 'chapter' ? (
					<AdminChapterDetails />
				) : id == 'info' ? (
					<AdminInfoDetails />
				) : (
					<AdminInfoDetails />
				)}
			</AdminLayout>
		</div>
	);
};

export default Admin;
