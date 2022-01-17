import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationsAction } from '../store/mix/notificationStore';
import Page from '../components/utilities/page/Page';
import LoadingPage from '../components/utilities/page/LoadingPage';
import PageError from '../components/utilities/page/PageError';
import PageCard from '../components/payment/refill/PageCard';
import SingleNotification from '../components/notification/SingleNotification';
import NotificationsContainer from '../components/notification/NotificationsContainer';
import TextButton from '../components/utilities/button/TextButton';
import Row from '../components/utilities/container/Row';

const Notifications = () => {
	const dispatch = useDispatch();
	const {
		notifications,
		loading,
		error,
		success,
		count,
		page,
		pages,
	} = useSelector(state => state.notifications);

	const [data, setData] = useState([]);
	const [initialized, setInitialized] = useState(false);
	const [initLoading, setInitLoading] = useState(true);
	const [onPage, setOnPage] = useState(page);

	useEffect(() => {
		dispatch(getNotificationsAction(`perpage=10&page=${onPage}`));
		setInitialized(true);
	}, [onPage]);

	useEffect(() => {
		if (!loading && initialized && initLoading) {
			setInitLoading(false);
		}
		!loading && initialized && setData(data => [...data, ...notifications]);
	}, [loading]);

	if (initLoading) return <LoadingPage />;
	if (error) return <PageError pre>{error}</PageError>;
	return (
		<Page>
			<PageCard>
				<h5>Notifications</h5>
				<NotificationsContainer>
					{data?.map((item, i) => (
						<SingleNotification key={i} item={item} />
					))}
				</NotificationsContainer>
				<LoadMore
					page={page}
					pages={pages}
					onClick={e => setOnPage(page + 1)}
				/>
			</PageCard>
		</Page>
	);
};

const LoadMore = ({ page, pages, onClick }) => {
	return (
		<div style={{ margin: '1rem auto' }}>
			{page != pages && <TextButton onClick={onClick}>Load More</TextButton>}
		</div>
	);
};

export default Notifications;
