import React, { useEffect, useState } from 'react';
import Page from '../components/utilities/page/Page';
import PageError from '../components/utilities/page/PageError';
import BookLayout from '../components/book/layout/BookLayout';
import Recommendations from '../components/book/recommendations/Recommendations';
import ChapterComments from '../components/book/comments/ChapterComments';
import ChapterInfo from '../components/book/info/ChapterInfo';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import getChapterAction from '../store/actions/books/getChapterAction';
import LoadingPage from '../components/utilities/page/LoadingPage';
import getCommentsAction from '../store/actions/books/getCommentsAction';
import useIsUnlocked from '../hooks/useIsUnlocked';
import { api, url } from '../constants';
import Head from 'next/head';

const Chap = ({ data }) => {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useDispatch();
	const [initLoading, setInitLoading] = useState(true);
	const { chapter, loading, error } = useSelector(state => state.chapter);
	const [initialized, setInitialized] = useState(false);
	const [onPage, setOnPage] = useState(1);
	const { loggedIn } = useSelector(state => state.auth);
	useEffect(() => {
		!loggedIn && router.push('/login');
	}, []);

	const unlock = useIsUnlocked(id);

	useEffect(() => {
		if (id != undefined) {
			dispatch(getChapterAction(id));
			dispatch(getCommentsAction('chapter', id, 1));
			setInitialized(true);
		}
	}, [id]);

	useEffect(() => {
		dispatch(getCommentsAction('chapter', id, onPage));
	}, [onPage]);

	useEffect(() => {
		if (id != undefined) {
			setInitLoading(true);
		}
	}, [id]);

	useEffect(() => {
		console.log(unlock);
		if (id != undefined) {
			if (initLoading && !loading && chapter && !unlock.loading) {
				if (chapter._id == id) {
					if (chapter.paid == true) {
						if (unlock.status == 1) setInitLoading(false);
						else if (unlock.status == 0) router.replace(`/locked?id=${id}`);
					} else {
						setInitLoading(false);
					}
				}
			}
		}
	}, [loading, id, chapter, unlock]);

	useEffect(() => {
		if (!loading && initialized && chapter?.status == 'deleted') {
			router.replace('404');
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
					property='og:image'
					content={data?.image || '/splash.jpg'}
					key='ogimage'
				/>
				<meta name='description' content={data?.description}></meta>
				<meta property='og:title' content={data?.title} key='ogtitle' />
				<meta
					property='og:description'
					content={data?.description}
					key='ogdesc'
				/>
				<meta
					property='og:url'
					content={`${url}/${router.asPath}`}
					key='ogurl'
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
				<PageError seo />
			) : (
				<div onContextMenu={e => e.preventDefault()}>
					<Page seo>
						<BookLayout>
							<ChapterInfo />
							<ChapterComments
								onPage={onPage}
								setOnPage={e => setOnPage(e)}
								book={chapter && chapter.book ? chapter.book._id : ''}
							/>
						</BookLayout>
					</Page>
				</div>
			)}
		</>
	);
};

// This gets called on every request
export async function getServerSideProps(context) {
	// Fetch data from external API
	try {
		const { id } = context.query;

		const res = await fetch(`${api.server}/info/chapter/${id}`);
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

export default Chap;
