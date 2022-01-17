import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { adminServer } from '../../constants/index';

const useAdminUpdates = ({ target, id, click, value }) => {
	const [doc, setDoc] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const { token } = useSelector(state => state.auth);
	const [success, setSuccess] = useState();
	const [reload, setReload] = useState(click ? click : false);

	useEffect(async () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		console.log('clicked', click, id, target);
		if (id != undefined && click == true && target != undefined) {
			try {
				setLoading(true);
				console.log('Data Requested');
				const { data } = await axios.put(
					`${adminServer}/${target}/${id}`,
					value,
					config
				);
				if (data) {
					setDoc(data.doc);
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
				setReload(false);
			}
		}
	}, [id, click]);

	return { doc, error, success, loading };
};

export default useAdminUpdates;
