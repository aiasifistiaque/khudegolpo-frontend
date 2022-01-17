import React from 'react';
import styles from './Page.module.css';
import Page from './Page';

const LoadingPage = ({ seo }) => {
	return (
		<Page seo={seo}>
			<div className={styles.loadingPage}>
				<div className={styles.loader} />
			</div>
		</Page>
	);
};

export default LoadingPage;
