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
import GrayButton from '../components/utilities/button/GrayButton';

const Gbooks = () => {
	const router = useRouter();
	const { type } = router.query;
	const dispatch = useDispatch();
	const { books, loading, error, page, total } = useSelector(
		state => state.books
	);
	const [initLoading, setInitLoading] = useState(true);
	const [data, setData] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [initialize, setInitialize] = useState(false);

	useEffect(() => {
		if (type != undefined) {
			let string = `sort=newest`;
			if (type == 'paid') {
				string = `paid=paid&sort=popular`;
			} else if (type == 'popular') {
				string = `sort=popular`;
			}

			dispatch(getBooksAction(`page=${pageNo}&${string}`));
			setInitialize(true);
		}
	}, [type, pageNo]);

	useEffect(() => {
		!loading && initLoading && books && setInitLoading(false);
		!loading && initialize && setData(data => [...data, ...books]);
	}, [loading]);

	if (initLoading) return <LoadingPage />;

	return (
		<Page>
			<BooksLayout>
				<br />
				<Books
					books={books && data}
					count={page && page}
					total={total && total}
					title={
						type == 'paid'
							? 'Top Paid Books'
							: type == 'popular'
							? 'Popular Books'
							: 'Latest Books'
					}
				/>
				{page == total ? (
					<p>End of Result</p>
				) : loading ? (
					<LoadingButton />
				) : (
					<GrayButton onClick={() => setPageNo(page + 1)}>Load More</GrayButton>
				)}
			</BooksLayout>
		</Page>
	);
};

export default Gbooks;
