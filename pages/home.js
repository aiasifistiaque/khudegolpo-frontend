import React, { useEffect } from 'react';
import Page from '../components/utilities/page/Page';
import Container from '../components/utilities/container/Container';
import RecentBookList from '../components/home/RecentBookList';
import { categories } from '../constants/data';
import HomeCover from '../components/home/HomeCover';
import HomeCoverGap from '../components/home/HomeCoverGap';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';
import LoadingPage from '../components/utilities/page/LoadingPage';

const PageHome = () => {
	const router = useRouter();
	const { loading, isLoggedIn } = useAuth();
	useEffect(() => {
		if (!isLoggedIn && !loading) {
			router.replace('/intro');
		}
	}, [loading]);

	if (loading) return <LoadingPage />;
	return (
		<Page>
			<HomeCover />
			<Container>
				<HomeCoverGap />
				<RecentBookList
					heading='Popular Books'
					option={'sort=popular&type=home'}
					type='popular'>
					Selected from the best
				</RecentBookList>
				<RecentBookList
					heading='Top Paid Books'
					option={'sort=popular&type=home&paid=paid'}
					type='paid'>
					Best paid books
				</RecentBookList>
				<RecentBookList
					heading='Latest Books'
					option={'sort=newest&type=home'}
					type='latest'>
					Read the latest books from our writers
				</RecentBookList>

				{categories.map((item, i) => (
					<RecentBookList
						key={i}
						heading={item}
						genre={item}
						option={`sort=popular&type=home&genre=${item}`}>
						{item}
					</RecentBookList>
				))}
			</Container>
		</Page>
	);
};

export default PageHome;
