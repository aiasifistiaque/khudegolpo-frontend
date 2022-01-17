import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../constants';

const useRecentBooks = string => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	useEffect(async () => {
		try {
			const { data } = await axios.get(`${api.book}?${string}&perpage=7`);
			if (data) {
				setLoading(false);
				setBooks(data.books);
			}
		} catch (e) {
			const error =
				e.response && e.response ? e.response.data.message : e.message;
			setLoading(false);
			setError(error);
		}
	}, [string]);
	return { books, loading, error };
};

export default useRecentBooks;
