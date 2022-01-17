import React, { useEffect, useState } from 'react';
import { api } from '../constants';
import axios from 'axios';

const useCovers = () => {
	const [loading, setLoading] = useState(true);
	const [doc, setDoc] = useState();
	const [error, setError] = useState();

	useEffect(async () => {
		setLoading(true);
		try {
			console.log('Covers Requested');
			const { data } = await axios.get(`${api.server}/basic/cover`);
			if (data) {
				setDoc(data.doc);
				setLoading(false);
				console.log('Request completed');
			}
		} catch (e) {
			const error =
				e.response && e.response ? e.response.data.message : e.message;
			setLoading(false);
			setError(error);
			console.log(error);
		}
	}, []);

	return { doc, error, loading };
};

export default useCovers;
