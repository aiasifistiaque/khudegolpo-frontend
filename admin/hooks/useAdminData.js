import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { adminServer } from '../../constants/index';

const useAdminData = ({ target, id, reload }) => {
	const [doc, setDoc] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const { token } = useSelector(state => state.auth);
	const [success, setSuccess] = useState();

	useEffect(async () => {
		setLoading(true);
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		if (id != undefined) {
			try {
				console.log('Data Requested');
				const { data } = await axios.get(
					`${adminServer}/${target}/${id}`,
					config
				);
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
		}
	}, [reload, id]);

	return { doc, error, success, loading };
};

export default useAdminData;
