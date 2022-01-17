import React, { useEffect } from 'react';
import Page from '../components/utilities/page/Page';
import Hero from '../components/intro/Hero';
import Stats from '../components/intro/Stats';
import Container from '../components/utilities/container/Container';
import SectionOne from '../components/intro/SectionOne';
import HowItWorks from '../components/intro/HowItWorks';
import GetDiscovered from '../components/intro/GetDiscovered';
import SecondSlider from '../components/intro/SecondSlider';
import useAdminInfo from '../admin/hooks/useAdminInfo';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';

const Intro = () => {
	const auth = useAuth();
	const router = useRouter();
	const { isLoggedIn } = auth;

	useEffect(() => {
		if (isLoggedIn) {
			router.replace('/home');
		}
	}, [isLoggedIn]);

	const { doc, loading, error, success } = useAdminInfo();
	const placeholder = {
		books: '...',
		chapters: '...',
		users: '...',
		authors: '...',
	};

	if (auth.loading || isLoggedIn) return null;
	return (
		<Page>
			<Container>
				<Hero />
				<Stats doc={!loading ? doc.doc : placeholder} />

				<SectionOne />
				<HowItWorks />
				<SecondSlider />
				<GetDiscovered />
			</Container>
		</Page>
	);
};

export default Intro;
