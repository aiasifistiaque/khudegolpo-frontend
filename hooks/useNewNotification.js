import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { api } from '../constants';

const useNewNotifications = () => {
	const [loading, setLoading] = useState(true);
	const { token } = useSelector(state => state.auth);
	const [status, setStatus] = useState(0);
	const [error, setError] = useState();

	useEffect(async () => {
		setLoading(true);
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		try {
			const { data } = await axios.get(
				`${api.server}/notifications/new`,
				config
			);
			setStatus(data.status);
			if (data) setLoading(false);
		} catch (e) {
			setStatus(0);
			setLoading(false);
			setError(e.message);
		}
	}, []);

	return { status, loading, error };
};

export default useNewNotifications;
