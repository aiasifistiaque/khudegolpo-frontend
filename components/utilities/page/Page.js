import React, { useState } from 'react';
import styles from './Page.module.css';
import Header from '../../navigation/header/Header';
import Footer from '../../navigation/footer/Footer';
import Sidebar from '../../navigation/sidebar/Sidebar';
import Search from '../../search/Search';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { alertOffAction } from '../../../store/actions/util/alertAction';

const Page = ({ children, title, description, image, seo }) => {
	const [sidebar, setSidebar] = useState(false);
	const [searchActive, setSearchActive] = useState(false);
	const { alert } = useSelector(state => state.alert);
	const dispatch = useDispatch();

	return (
		<div>
			{!seo && (
				<Head>
					<title>{title ? title : 'Khudegolpo'}</title>
					<meta name='description' content='Khudegolpo' />
					<link rel='icon' href='/favicon.ico' />
					<meta
						name='viewport'
						content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
					/>
					<meta name='description' content={description}></meta>
					<meta property='og:title' content={title} key='ogtitle' />
					<meta property='og:description' content={description} key='ogdesc' />
					{/* <meta property='og:url' content={currentURL} key='ogurl' /> */}
					<meta
						property='og:image'
						content={image ? image : '/splash.jpg'}
						key='ogimage'
					/>
					<meta
						property='og:site_name'
						content={'Khudegolpo'}
						key='ogsitename'
					/>
				</Head>
			)}
			<Header
				barPressed={sidebar}
				open={() => setSidebar(true)}
				close={() => setSidebar(false)}
				on={() => setSearchActive(!searchActive)}
				search={searchActive}
				onClick={() => {
					alert && dispatch(alertOffAction());
				}}
			/>
			<Search active={searchActive} off={() => setSearchActive(false)} />

			<main
				className={
					searchActive || sidebar || alert
						? styles.containerOverLay
						: styles.page
				}
				onClick={() => {
					sidebar && setSidebar(false);
					searchActive && setSearchActive(false);
					//alert && dispatch(alertOffAction());
				}}>
				<Sidebar barPressed={sidebar} />

				{(searchActive || sidebar || alert) && (
					<div className={styles.overlay} />
				)}
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default Page;
