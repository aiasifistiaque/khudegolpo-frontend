import React from 'react';
import styles from './Admin.module.css';

const PageSelector = ({ page, pages, setOnPage }) => {
	return (
		<div className={styles.pagebuttoncontainer}>
			<div className={styles.pageButtonText}>
				<p>
					page: {page} of {pages}
				</p>
			</div>

			{[...Array(pages)].map((x, i) => (
				<div
					key={i}
					className={
						page == i + 1 ? styles.pageButtonSelected : styles.pageButton
					}
					onClick={() => {
						page !== i + 1 && setOnPage(i + 1);
					}}>
					<p>{i + 1}</p>
				</div>
			))}
		</div>
	);
};

export default PageSelector;
