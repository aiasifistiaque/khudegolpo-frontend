import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useSelf = () => {
	const [initLoading, setInitLoading] = useState(true);
	const { book, loading, error } = useSelector(state => state.book);
	const { user } = useSelector(state => state.user);
	const [self, setSelf] = useState(false);

	useEffect(() => {
		initLoading && !loading && setInitLoading(false);
		!loading &&
			!initLoading &&
			user &&
			book.author._id == user._id &&
			setSelf(true);
	}, [initLoading, loading, user]);

	return { self };
};

export default useSelf;
