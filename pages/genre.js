import React, { useEffect, useState } from 'react';
import Page from '../components/utilities/page/Page';
import LoadingPage from '../components/utilities/page/LoadingPage';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import getBooksAction from '../store/actions/books/getBooksAction';
import Books from '../components/book/books/Books';
import Button from '../components/utilities/button/Button';
import LoadingButton from '../components/utilities/button/LoadingButton';
import BooksLayout from '../components/book/books/BooksLayout';
import PageTitle from '../components/utilities/text/PageTitle';
import PaidBooksList from '../components/book/books/PaidBooksList';

const Genre = () => {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useDispatch();
	const { books, loading, error, page, total } = useSelector(
		state => state.books
	);
	const [initLoading, setInitLoading] = useState(true);
	const [data, setData] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [initialize, setInitialize] = useState(false);

	useEffect(() => {
		if (id != undefined) {
			let string = `genre=${id}&page=${pageNo}&paid=free`;
			if (id == 'popular') {
				string = `page=${pageNo}&paid=free`;
			}
			dispatch(getBooksAction(string));
			setInitialize(true);
		}
	}, [id, pageNo]);

	useEffect(() => {
		!loading && initLoading && books && setInitLoading(false);
		!loading && initialize && setData(data => [...data, ...books]);
	}, [loading]);

	if (initLoading) return <LoadingPage />;

	return (
		<Page>
			<BooksLayout>
				<PageTitle>Genre: {id}</PageTitle>
				<PaidBooksList />
				<Books
					books={books && data}
					count={page && page}
					total={total && total}
				/>
				{page == total ? (
					<p>End of Result</p>
				) : loading ? (
					<LoadingButton />
				) : (
					<Button onClick={() => setPageNo(page + 1)}>Load More</Button>
				)}
			</BooksLayout>
		</Page>
	);
};

export default Genre;
