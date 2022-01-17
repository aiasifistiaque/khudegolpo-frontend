import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Page from '../../components/utilities/page/Page';
import Profile from '../../components/dashboard/profile/Profile';
import DashInfo from '../../components/dashboard/info/DashInfo';
import DashLayout from '../../components/dashboard/DashLayout';
import Followers from '../../components/dashboard/follow/Followers';
import Followings from '../../components/dashboard/follow/Followings';
import ChangePassword from '../../components/dashboard/manage/ChangePassword';
import ManageProfile from '../../components/dashboard/manage/ManageProfile';
import { useDispatch, useSelector } from 'react-redux';
import getProfileAction from '../../store/actions/auth/getProfileAction';
import getFollowersAction from '../../store/actions/auth/getFollowersAction';
import LoadingPage from '../../components/utilities/page/LoadingPage';

const DashBr = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { id } = router.query;
	const [initLoading, setInitLoading] = useState(true);
	const { user, error, loading } = useSelector(state => state.user);
	const {
		followLoading,
		followers,
		followersList,
		followings,
		followingsList,
	} = useSelector(state => state.followers);
	const [initialize, setInitialize] = useState();

	useEffect(() => {
		dispatch(getProfileAction());
		dispatch(getFollowersAction());
		setInitialize(true);
	}, []);
	useEffect(() => {
		if (!loading && followLoading && initialize && initLoading) {
			setInitLoading(false);
		}
	}, [loading, followLoading, initialize]);
	if (initLoading) {
		return <LoadingPage />;
	} else
		return (
			<Page>
				{!loading && (
					<DashLayout>
						<Profile user={user} />
						{id == 'info' ? (
							<DashInfo
								name={user.name}
								username={user.username}
								email={user.email}
								description={user.description}
								balance={user.walletBalance}
								earning={user.earning}
							/>
						) : id == 'followers' && followers ? (
							<Followers count={followers} list={followersList} />
						) : id == 'followings' && followings ? (
							<Followings count={followings} list={followingsList} />
						) : id == 'change' ? (
							<ChangePassword />
						) : id == 'manage' ? (
							<ManageProfile user={user} />
						) : null}
					</DashLayout>
				)}
			</Page>
		);
};

export default DashBr;
