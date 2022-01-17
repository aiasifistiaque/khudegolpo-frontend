import React, { useState, useEffect } from 'react';
import styles from './BookInfo.module.css';
import LongButton from '../../utilities/button/LongButton';
import { useSelector, useDispatch } from 'react-redux';
import LoadingInnerPage from '../../utilities/page/LoadingInnerPage';
import selectStyle from '../../utilities/textinput/TextInput.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Alert from '../../alert/Alert';
import DangerButton from '../../utilities/button/ButtonOutlinedLongDanger';
import { alertOffAction } from '../../../store/actions/util/alertAction';
import publishChapterAction from '../../../store/actions/books/publishChapterAction';
import toK from '../../../functions/toK';
import TextButton from '../../utilities/button/TextButton';
import IconButton from '../../utilities/button/IconButton';
import Row from '../../utilities/container/Row';
import countWords from '../../../functions/countWords';
import BookShare from './BookShare';

const ChapterInfo = () => {
	const { chapter, loading, error, viewer } = useSelector(
		state => state.chapter
	);
	const dispatch = useDispatch();
	const [showAlert, setShowAllert] = useState(false);
	const [alertState, setAlertState] = useState('');
	const { alert } = useSelector(state => state.alert);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		setShowAllert(alert);
		if (!alert) {
			setAlertState('');
		}
	}, [alert]);

	if (loading) return <LoadingInnerPage />;

	return (
		<>
			<div className={styles.info}>
				<div className={styles.cover}>
					<Link href={`/book?id=${chapter.book._id}`}>
						<img
							src={chapter.book.image || '/book/book.png'}
							alt={chapter.book.title}
							style={{ cursor: 'pointer' }}
						/>
					</Link>

					{viewer == 'self' && (
						<LongButton
							noMargin
							bottomRounded
							onClick={() => router.push(`/editchapter?id=${id}`)}>
							Edit
						</LongButton>
					)}

					{viewer == 'self' && (
						<Row style={{ margin: '.5rem 0' }}>
							{chapter?.book?.status == 'published' &&
								chapter.status != 'published' && (
									<TextButton
										bg
										danger
										rounded
										onClick={() => {
											setShowAllert(true);
											setAlertState('publish');
										}}>
										Publish
									</TextButton>
								)}
							<IconButton
								icon='delete-red'
								size={20}
								bg
								onClick={() => {
									setShowAllert(true);
									setAlertState('delete');
								}}
							/>
						</Row>
					)}

					<div className={styles.coverText}>
						<Link href={`/book?id=${chapter.book._id}`}>
							<a>{chapter.book.title}</a>
						</Link>
						<p>Chapter: {chapter.title}</p>
						<BookShare type='chapter' item={chapter} />
						<TextButton
							bg
							onClick={() =>
								router.push(`/report?type=chapter&target=${chapter._id}`)
							}>
							Report
						</TextButton>
					</div>
				</div>
				<div className={styles.main}>
					<h5>{chapter.book.title}</h5>
					<div className={styles.details}>
						<p>View: {chapter.views}</p>
						<p>Words: {toK(countWords(chapter.description))}</p>
					</div>

					<Select data={chapter.book.chapters} value={chapter.title} />
					<br />
					{chapter.book.chapters.map(
						(chap, i) =>
							chap._id == chapter._id && <h5 key={i}>Chapter {i + 1}</h5>
					)}

					<h5>{chapter.title}</h5>
					<br />
					<div
						dangerouslySetInnerHTML={{ __html: chapter.description }}
						className={styles.chapter}
					/>

					<br />
					<NextChapterButton chapter={chapter} />
				</div>
				<div className={styles.ad}>
					<img src='/book/ad1.png' alt='ad' />
				</div>
			</div>
			<Alert open={alertState == 'publish' ? true : false} close={alert}>
				<h5>Are you sure you want to publish this chapter?</h5>
				<br />
				<LongButton
					rounded
					onClick={() => {
						dispatch(
							publishChapterAction({ id: chapter._id, status: 'published' })
						);
						dispatch(alertOffAction());
					}}>
					Confirm
				</LongButton>
				<DangerButton
					rounded
					onClick={() => {
						dispatch(alertOffAction());
					}}>
					Cancel
				</DangerButton>
			</Alert>
			<Alert open={alertState == 'delete' ? true : false} close={alert}>
				<h5>Are you sure you want to delete this chapter?</h5>
				<br />
				<LongButton
					danger
					rounded
					onClick={() => {
						dispatch(
							publishChapterAction({ id: chapter._id, status: 'deleted' })
						);
						dispatch(alertOffAction());
					}}>
					Confirm
				</LongButton>
				<DangerButton
					rounded
					onClick={() => {
						dispatch(alertOffAction());
					}}>
					Cancel
				</DangerButton>
			</Alert>
		</>
	);
};

const Select = ({ value, setValue, data, label }) => {
	const router = useRouter();
	const [val, setVal] = useState(value);

	return (
		<div className={selectStyle.cInput}>
			<label>{label}</label>
			<select
				onChange={e => {
					setVal(e.target.value);
					router.push(`/chapter?id=${e.target.value}`);
				}}>
				{data.map((option, i) => (
					<option
						key={i}
						value={option._id}
						selected={option.title == value ? true : false}>
						{option.title} {option.status}
					</option>
				))}
			</select>
		</div>
	);
};

const NextChapterButton = ({ chapter }) => {
	const router = useRouter();
	return (
		<>
			{chapter.book.chapters.map((chap, i) =>
				chap._id == chapter._id ? (
					i < chapter.book.chapters.length - 1 ? (
						<TextButton
							bg
							key={chapter._id}
							onClick={() =>
								router.push(`/chapter?id=${chapter.book.chapters[i + 1]._id}`)
							}>
							Next Chapter
						</TextButton>
					) : (
						<h5>End of book</h5>
					)
				) : null
			)}
		</>
	);
};

export default ChapterInfo;
