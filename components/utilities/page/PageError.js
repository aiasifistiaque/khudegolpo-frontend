import React from 'react';
import styles from './Page.module.css';
import Page from './Page';
import { colors } from '../../../constants/styles';

const PageError = ({ children, pre, seo }) => {
	return (
		<Page seo={seo}>
			<div className={styles.loadingInnerPage}>
				<h5 style={{ color: colors.danger }}>
					{pre ? 'Your requested page was not found' : children}
				</h5>
			</div>
		</Page>
	);
};

export default PageError;
