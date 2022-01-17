import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { api } from '../constants';

const useIsUnlocked = id => {
	const [loading, setLoading] = useState(true);
	const { token } = useSelector(state => state.auth);
	const [status, setStatus] = useState(6);
	const [error, setError] = useState();

	useEffect(async () => {
		setLoading(true);
		setStatus(9);
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		try {
			const { data } = await axios.get(`${api.unlock}/${id}`, config);
			setStatus(data.unlocked);
			if (data) setLoading(false);
		} catch (e) {
			setLoading(false);
			setError(e.message);
		}
	}, [id]);

	return { status, loading, error };
};

export default useIsUnlocked;
