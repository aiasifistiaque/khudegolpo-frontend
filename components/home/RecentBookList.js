import React from 'react';
import styles from './Home.module.css';
import SubHeading from '../utilities/text/SubHeading';
import Button from '../utilities/button/Button';
import CenterContainer from '../utilities/container/CenterContainer';
import LoadingInnerPage from '../utilities/page/LoadingInnerPage';
import useRecentBooks from '../../hooks/useRecentBooks';
import BookLink from './BookLink';
import HomeBookDetail from './HomeBookDetail';
import { useRouter } from 'next/router';
import GrayButton from '../utilities/button/GrayButton';

const RecentBookList = ({ heading, children, option, genre, type }) => {
	const { books, loading, error } = useRecentBooks(option);
	const router = useRouter();
	if (loading || error) return <LoadingInnerPage />;
	if (books.length < 4) return null;
	return (
		<>
			<div className={styles.homelist}>
				<h5>{heading}</h5>
				<SubHeading>{children}</SubHeading>
				<div className={styles.books}>
					{books.map((book, i) => i > 0 && <BookLink book={book} />)}
				</div>

				<CenterContainer>
					<GrayButton
						onClick={() => {
							if (type == 'latest') {
								router.push(`/books?type=${type}`);
							} else if (type == 'popular') {
								router.push(`/books?type=${type}`);
							} else if (type == 'paid') {
								router.push(`/books?type=${type}`);
							} else {
								router.push(`/genre?id=${genre}`);
							}
						}}>
						View More
					</GrayButton>
				</CenterContainer>
			</div>
			<HomeBookDetail book={books[0]} />
		</>
	);
};

export default RecentBookList;
