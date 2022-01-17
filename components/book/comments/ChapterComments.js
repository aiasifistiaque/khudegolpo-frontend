import React, { useState, useEffect } from 'react';
import styles from './BookComments.module.css';
import LongButton from '../../utilities/button/LongButton';
import Button from '../../utilities/button/Button';
import TextBox from '../../utilities/textinput/TextBox';
import { useSelector, useDispatch } from 'react-redux';
import LoadingInnerPage from '../../utilities/page/LoadingInnerPage';
import axios from 'axios';
import { api } from '../../../constants';
import { tokenName } from '../../../store/storeConstants';
import { useRouter } from 'next/router';
import getCommentsAction from '../../../store/actions/books/getCommentsAction';
import LoadingButton from '../../utilities/button/LoadingButton';
import Comment from './Comment';
import CommentBox from '../../utilities/textinput/CommentBox';
import TextButton from '../../utilities/button/TextButton';

const ChapterComments = ({ book, onPage, setOnPage }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { id } = router.query;
	const { loading, comments, error, page, total } = useSelector(
		state => state.comments
	);
	const [initLoading, setInitLoading] = useState(true);
	const [posting, setPosting] = useState(false);
	const [comment, setComment] = useState('');
	const [doc, setDoc] = useState();

	const token = JSON.parse(localStorage.getItem(tokenName));

	useEffect(() => {
		if (initLoading && !loading) {
			setInitLoading(false);
		}
	}, [loading]);

	useEffect(() => {
		if (!loading && comments) {
			if (page == 1) {
				setDoc(comments);
			} else {
				setDoc(doc => [...doc, ...comments]);
			}
		}
	}, [loading]);

	const makeComment = async () => {
		if (comment.length < 1) {
			return;
		}
		setPosting(true);
		const newComment = { chapter: id, book, comment };
		try {
			const { data } = await axios.post(api.comments, newComment, {
				headers: {
					'Content-Type': 'application/json',
					authorization: token,
				},
			});
			if (data) {
				setOnPage(1);

				dispatch(getCommentsAction('chapter', id, onPage));
				setPosting(false);
				setComment('');
			}
		} catch (e) {
			console.log(e);
			setPosting(false);
		}
	};

	if (initLoading || error) return <LoadingInnerPage />;
	return (
		<div className={styles.container}>
			<div className={styles.postComment}>
				<h6>Leave a comment</h6>

				<div className={styles.commentBox}>
					<div className={styles.text}>
						<h6>{name}</h6>
						<CommentBox value={comment} onChange={e => setComment(e)}>
							Leave a Comment
						</CommentBox>
					</div>
				</div>
				{posting ? (
					<LoadingButton />
				) : (
					<Button onClick={makeComment}>Post</Button>
				)}
			</div>

			<h5>Comments</h5>
			{comments.length == 0 ? (
				<p style={{ marginTop: '1rem' }}>No Comments posted yet</p>
			) : (
				<div className={styles.commentContainer}>
					{doc &&
						doc.map(comment => (
							<Comment
								name={comment.user.username}
								image={comment.user.image || '/book/pp.png'}
								date={comment.createdAt}
								key={comment._id}>
								{comment.comment}
							</Comment>
						))}
				</div>
			)}

			<br />
			{total > page && (
				<TextButton onClick={() => setOnPage(page + 1)}>Load More</TextButton>
			)}
		</div>
	);
};

export default ChapterComments;
