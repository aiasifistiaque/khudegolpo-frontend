import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { api, adminServer } from '../../constants/index';

const useAdminApi = ({ page, query, target }) => {
	const [doc, setDoc] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const [count, setCount] = useState(0);
	const [pages, setPages] = useState(0);
	const { token } = useSelector(state => state.auth);

	useEffect(async () => {
		setLoading(true);
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};

		try {
			console.log('Data Requested');
			const { data } = await axios.get(
				`${adminServer}/${target}?page=${page}&${query}`,
				config
			);
			if (data) {
				setDoc(data.doc);
				setCount(data.count);
				setLoading(false);
				setPages(data.pages);
				console.log('Request completed');
			}
		} catch (e) {
			const error =
				e.response && e.response ? e.response.data.message : e.message;
			setLoading(false);
			setError(error);
			console.log(error);
		}
	}, [page, query]);

	return { doc, loading, error, count, pages, page };
};

export default useAdminApi;
