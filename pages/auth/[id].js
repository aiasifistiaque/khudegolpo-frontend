import React, { useEffect } from 'react';
import Page from '../../components/utilities/page/Page';
import { useRouter } from 'next/dist/client/router';
import { useDispatch } from 'react-redux';
import { socialLoginAction } from '../../store/mix/socialLoginStore';
import LoadingPage from '../../components/utilities/page/LoadingPage';

const AuthCallback = () => {
	const router = useRouter();
	const { id, code, provider_id } = router.query;
	const dispatch = useDispatch();
	useEffect(() => {
		if (code != undefined && provider_id != undefined) {
			dispatch(socialLoginAction({ id, code, provider_id }));
		}
	}, [code, provider_id]);
	return <LoadingPage />;
};

export default AuthCallback;
