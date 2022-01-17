import React, { useEffect } from 'react';
import Register from '../components/auth/register/Register';
import Page from '../components/utilities/page/Page';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';

const Reg = () => {
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
			<Register />;
		</Page>
	);
};

export default Reg;
