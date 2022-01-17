import React, { useEffect } from 'react';
import Page from '../components/utilities/page/Page';
import Login from '../components/auth/login/Login';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';

const Log = () => {
	const { loading, isLoggedIn } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (isLoggedIn) {
			router.replace('/home');
		}
	}, [isLoggedIn]);
	if (loading || isLoggedIn) return null;
	return (
		<Page>
			<Login />
		</Page>
	);
};

export default Log;
