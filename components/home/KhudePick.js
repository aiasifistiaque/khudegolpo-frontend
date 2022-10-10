import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import SubHeading from '../utilities/text/SubHeading';
import LoadingInnerPage from '../utilities/page/LoadingInnerPage';
import BookLink from './BookLink';
import HomeBookDetail from './HomeBookDetail';
import { useRouter } from 'next/router';
import useAdminInfo from '../../admin/hooks/useAdminInfo';

const KhudePick = () => {
	const { doc, loading, error, success } = useAdminInfo();

	if (loading || error) return <LoadingInnerPage />;

	return (
		<>
			<div className={styles.homelist}>
				<h5>KhudeGolpo Picks</h5>
				<SubHeading>Hand Picked by our critics</SubHeading>
				{doc?.doc && (
					<div className={styles.books}>
						<BookLink book={doc.doc.bookOne} />
						<BookLink book={doc.doc.bookTwo} />
						<BookLink book={doc.doc.bookThree} />
						<BookLink book={doc.doc.bookFour} />
						<BookLink book={doc.doc.bookFive} />
						<BookLink book={doc.doc.bookSix} />
					</div>
				)}
			</div>
			{/* <HomeBookDetail book={books[0]} /> */}
		</>
	);
};

export default KhudePick;
