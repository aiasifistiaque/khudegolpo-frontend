import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { adminServer } from '../../constants/index';

const useAdminInfo = () => {
	const [doc, setDoc] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const [success, setSuccess] = useState();

	useEffect(async () => {
		setLoading(true);
		try {
			console.log('Data Requested');
			const { data } = await axios.get(`${adminServer}/basic`);
			if (data) {
				setDoc(data);
				console.log('Request completed');
				setSuccess(true);
			}
		} catch (e) {
			const error =
				e.response && e.response ? e.response.data.message : e.message;

			setError(error);
			console.log(error);
			setSuccess(false);
		} finally {
			setLoading(false);
		}
	}, []);

	return { doc, error, success, loading };
};

export default useAdminInfo;
