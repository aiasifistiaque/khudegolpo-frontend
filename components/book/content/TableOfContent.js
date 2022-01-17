import React from 'react';
import styles from './TableOfContent.module.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import useSelf from '../../../hooks/useSelf';
import { useRouter } from 'next/router';
import LongButton from '../../utilities/button/LongButton';
import LoadingInnerPage from '../../utilities/page/LoadingInnerPage';
import useIsUnlocked from '../../../hooks/useIsUnlocked';
import TextButton from '../../utilities/button/TextButton';

const TableOfContent = () => {
	const { book, loading, error, viewer } = useSelector(state => state.book);
	const { chapters } = book;
	const router = useRouter();

	if (loading || error) return <LoadingInnerPage />;
	else
		return (
			<div className={styles.container}>
				<h5>Table of Content</h5>
				{chapters.length == 0 && (
					<p style={{ marginTop: '1rem' }}>No Chapter has been written yet</p>
				)}
				<div className={styles.chapterContainer}>
					{chapters.map(
						(chapter, i) =>
							(chapter.status == 'published' || viewer == 'self') && (
								<Chapter
									chapter={chapter}
									id={chapter._id}
									key={chapter._id}
									lock={chapter.paid}>{`Chapter: ${chapter.title}`}</Chapter>
							)
					)}
				</div>
				{viewer == 'self' && (
					<TextButton
						bg
						onClick={() => router.replace(`/addchapter?book=${book._id}`)}>
						Add New Chapter
					</TextButton>
				)}
			</div>
		);
};

const Chapter = ({ children, lock, id, chapter }) => {
	const { status, loading } = useIsUnlocked(id);
	if (loading) return <div className={styles.chapter}>Loading...</div>;
	if (chapter.status == 'deleted') return null;
	else
		return (
			<Link
				href={
					lock
						? status == 0
							? `/chapter?id=${id}`
							: status == 1 && `/chapter?id=${id}`
						: `/chapter?id=${id}`
				}>
				<a className={styles.chapter}>
					<p>{children}</p>
					{chapter.status != 'published' ? (
						<p>unpublished</p>
					) : lock ? (
						status == 0 ? (
							<img src='/icons/lock.png' alt='lock' />
						) : (
							status == 1 && <img src='/icons/unlocked.png' alt='lock' />
						)
					) : null}
				</a>
			</Link>
		);
};

export default TableOfContent;
