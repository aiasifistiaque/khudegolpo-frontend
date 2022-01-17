import React, { useEffect, useState } from 'react';
import { tokenName } from '../store/storeConstants';

const useAuth = () => {
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState();
	const [authToken, setAuthToken] = useState('');

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem(tokenName));

		if (token != null) {
			setAuthToken(() => token);
			setIsLoggedIn(() => true);
		} else {
			setIsLoggedIn(() => false);
		}
		setLoading(() => false);
	}, []);

	return { loading, isLoggedIn, token: authToken };
};

export default useAuth;
