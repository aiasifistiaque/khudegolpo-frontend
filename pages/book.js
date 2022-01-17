import React, { useEffect, useState } from 'react';
import Page from '../components/utilities/page/Page';
import LoadingPage from '../components/utilities/page/LoadingPage';
import BookLayout from '../components/book/layout/BookLayout';
import BookInfo from '../components/book/info/BookInfo';
import Recommendations from '../components/book/recommendations/Recommendations';
import TableOfContent from '../components/book/content/TableOfContent';
import BookComments from '../components/book/comments/BookComments';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import getBookAction from '../store/actions/books/getBookAction';
import getCommentsAction from '../store/actions/books/getCommentsAction';
import isInLibraryAction from '../store/actions/library/isInLibraryAction';
import PageError from '../components/utilities/page/PageError';
import StoreIcons from '../components/utilities/extras/StoreIcons';
import Row from '../components/utilities/container/Row';
import { api, url } from '../constants';
import Head from 'next/head';
import * as lib from '../lib/functions';

const BooK = ({ data }) => {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useDispatch();
	const [initLoading, setInitLoading] = useState(true);
	const { book, loading, error, viewer } = useSelector(state => state.book);
	const [onPage, setOnPage] = useState(1);
	const { loggedIn } = useSelector(state => state.auth);

	useEffect(() => {
		!loggedIn && router.push('/login');
	}, []);

	useEffect(() => {
		if (id != undefined) {
			dispatch(getBookAction(id));
			dispatch(isInLibraryAction(id));
			dispatch(getCommentsAction('book', id, 1));
		}
	}, [id]);

	useEffect(() => {
		dispatch(getCommentsAction('book', id, onPage));
	}, [onPage]);

	useEffect(() => {
		if (book?.status == 'deleted') {
			router.replace('404');
		}
		if (initLoading && !loading) {
			setInitLoading(false);
		}
	}, [loading]);

	return (
		<>
			<Head>
				<title>{data?.title}</title>
				<meta name='description' content='arewa books' />
				<link rel='icon' href='/favicon.ico' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
				/>
				<meta
					name='description'
					content={lib.stripHtml(data?.description)}></meta>
				<meta property='og:title' content={data?.title} key='ogtitle' />
				<meta
					property='og:description'
					content={lib.stripHtml(data?.description)}
					key='ogdesc'
				/>
				<meta
					property='og:url'
					content={`${url}/${router.asPath}`}
					key='ogurl'
				/>
				<meta
					property='og:image'
					content={data?.image || '/splash.jpg'}
					key='ogimage'
				/>
				<meta
					property='og:site_name'
					content={'Arewa Books'}
					key='ogsitename'
				/>
			</Head>
			{initLoading ? (
				<LoadingPage seo />
			) : error ? (
				<PageError seo></PageError>
			) : (
				<Page seo>
					<BookLayout>
						<BookInfo seo={data} />

						{book.platform != 'app only' || (viewer && viewer == 'self') ? (
							<>
								<TableOfContent />
								<BookComments onPage={onPage} setOnPage={e => setOnPage(e)} />
							</>
						) : (
							<>
								<Row column center style={{ margin: '5rem 0' }}>
									<h5 style={{ fontWeight: 600, textAlign: 'center' }}>
										This book is available only in ArewaBooks Mobile App
									</h5>
									<br />
									<Row>
										<StoreIcons />
									</Row>
								</Row>
							</>
						)}

						<Recommendations genre={book.genre ? book.genre : ''} />
					</BookLayout>
				</Page>
			)}
		</>
	);
};

// This gets called on every request
export async function getServerSideProps(context) {
	// Fetch data from external API
	try {
		const { id } = context.query;

		const res = await fetch(`${api.server}/info/book/${id}`);
		const data = await res.json();

		if (data.status != 'success') {
			return {
				redirect: {
					destination: '/404',
					permanent: false,
				},
			};
		}

		// Pass data to the page via props
		return { props: { data: data.doc } };
	} catch (e) {
		console.log(e);
		return {
			redirect: {
				destination: '/404',
				permanent: false,
			},
		};
	}
}

export default BooK;
