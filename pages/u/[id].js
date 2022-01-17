import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../components/utilities/page/Page';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendAction } from '../../store/mix/userStore';
import LoadingPage from '../../components/utilities/page/LoadingPage';
import PageError from '../../components/utilities/page/PageError';
import UserProfile from '../../components/user/UserProfile';
import ProfileContainer from '../../components/user/ProfileContainer';
import ProfileBooks from '../../components/book/books/ProfileBooks';

const User = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const { id } = router.query;

	const { loading, user, books, follow, error, success } = useSelector(
		state => state.friend
	);

	const [pageLoad, setPageLoad] = useState(true);
	const [init, setInit] = useState(false);

	useEffect(() => {
		if (!loading && init && success) {
			//setData({ user, books });
			setPageLoad(false);
		}
	}, [loading, init, success]);

	useEffect(() => {
		if (id != undefined) {
			dispatch(getFriendAction(id));
			setInit(true);
		}
	}, [id]);

	if (pageLoad) return <LoadingPage />;
	if (error) return <PageError>{error}</PageError>;
	return (
		<Page>
			<ProfileContainer>
				<UserProfile
					user={user}
					books={books ? books.length : 0}
					follow={loading ? 3 : follow}
				/>
				<ProfileBooks books={books} />
			</ProfileContainer>
		</Page>
	);
};

export default User;
