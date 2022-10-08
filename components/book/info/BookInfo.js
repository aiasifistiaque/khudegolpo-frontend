import React, { useEffect, useState } from 'react';
import styles from './BookInfo.module.css';
import LongButton from '../../utilities/button/LongButton';
import { useSelector, useDispatch } from 'react-redux';
import useSelf from '../../../hooks/useSelf';
import LoadingInnerPage from '../../utilities/page/LoadingInnerPage';
import AddToLibraryButton from './AddToLibraryButton';
import Alert from '../../alert/Alert';
import DangerButton from '../../utilities/button/ButtonOutlinedLongDanger';
import { alertOffAction } from '../../../store/actions/util/alertAction';
import publishBookAction from '../../../store/actions/books/publishBookAction';
import { useRouter } from 'next/router';
import TextButton from '../../utilities/button/TextButton';
import BookAuthor from './BookAuthor';
import BookDescription from './BookDescription';
import toK from '../../../functions/toK';
import IconButton from '../../utilities/button/IconButton';
import Row from '../../utilities/container/Row';
import BookShare from './BookShare';
import ChangePhoto from '../../change-photo/ChangePhoto';

const BookInfo = ({ seo }) => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { book, loading, error, viewer, words } = useSelector(
		state => state.book
	);
	const { alert } = useSelector(state => state.alert);
	const [alertState, setAlertState] = useState('');

	const { _id, title, image, author, chapters, likes, description, views } =
		book;

	const { self } = useSelf();

	const [showAlert, setShowAllert] = useState(false);

	useEffect(() => {
		if (!alert) {
			setShowAllert(alert);
			setAlertState('');
		}
	}, [alert]);

	if (loading || error) return <LoadingInnerPage />;
	else
		return (
			<>
				<div className={styles.info}>
					<div className={styles.cover}>
						<ChangePhoto id={_id && _id} book={book && book} />
						<img src={image} alt={title} />
						{!self ? (
							<AddToLibraryButton id={_id} />
						) : (
							<>
								{viewer == 'self' && book.status != 'published' && (
									<LongButton
										noMargin
										bottomRounded
										onClick={() => {
											setShowAllert(true);
											setAlertState('publish');
										}}
										type='publishBook'>
										Publish
									</LongButton>
								)}
								<Row style={{ margin: '.5rem 0' }}>
									<TextButton
										bg
										onClick={() => router.push(`/editbook?id=${book._id}`)}>
										Edit Book
									</TextButton>
									<IconButton
										bg
										icon='delete-red'
										size={20}
										onClick={() => setAlertState('delete')}
									/>
								</Row>
							</>
						)}
						<BookShare item={book} type='book' seo={seo} />
					</div>

					<div className={styles.main}>
						<h5>{title}</h5>
						<div className={styles.details}>
							<p>Views: {views ? views : 1}</p>
							<p>Chapters: {chapters.length}</p>
							<p>Words: {toK(words)}</p>
						</div>
						<BookAuthor image='/book/pp.png' author={author} />

						<BookDescription book={book} viewer={viewer} />
						<div style={{ alignSelf: 'flex-end', marginTop: '2rem' }}>
							<TextButton
								bg
								onClick={() =>
									router.push(`/report?type=book&target=${book._id}`)
								}>
								Report Book
							</TextButton>
						</div>
					</div>

					<div className={styles.ad}>
						{/* <img src='/book/ad1.png' alt='ad' /> */}
						{/* 
						<AdSense.Google
							style={{ display: 'inline-block', width: 100, height: 400 }}
							client={gtag.G_AD_ID}
							slot='1348720664'
						/> */}

						{/* <ins
							className='adsbygoogle'
							style='display:block'
							data-ad-client='ca-pub-5238205820969731'
							data-ad-slot='5486565786'
							data-ad-format='auto'
							data-full-width-responsive='true'></ins> */}
					</div>
				</div>

				<Alert open={alertState == 'publish' ? true : false} close={alert}>
					<h5>{book.title}</h5>
					<p>by {book.author.name}</p>
					<br />
					<p>Are you sure you want to publish?</p>
					<br />
					<LongButton
						rounded
						onClick={() => {
							dispatch(
								publishBookAction({ id: book._id, status: 'published' })
							);
							dispatch(alertOffAction());
							setAlertState('');
						}}>
						Confirm
					</LongButton>
					<DangerButton
						rounded
						onClick={() => {
							dispatch(alertOffAction());
							setAlertState('');
						}}>
						Cancel
					</DangerButton>
				</Alert>
				<Alert open={alertState == 'delete' ? true : false} close={alert}>
					<h5>{book.title}</h5>
					<p>by {book.author.name}</p>
					<br />
					<p>Are you sure you Delete this book?</p>
					<br />
					<LongButton
						rounded
						danger
						onClick={() => {
							dispatch(publishBookAction({ id: book._id, status: 'deleted' }));
							dispatch(alertOffAction());
							setAlertState('');
						}}>
						Delete
					</LongButton>
					<DangerButton
						rounded
						onClick={() => {
							dispatch(alertOffAction());
							setAlertState('');
						}}>
						Cancel
					</DangerButton>
				</Alert>
			</>
		);
};

export default BookInfo;
