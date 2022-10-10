import React, { useEffect, useState, useRef } from 'react';
import AdminLoading from '../util/AdminLoading';
import useAdminData from '../hooks/useAdminData';
import AdminError from '../util/AdminError';
import { useRouter } from 'next/router';
import DetailContainer from '../DetailContainer';
import DetailLayout from '../DetailLayout';
import DetailItems from '../util/DetailItems';
import ErrorText from '../../components/utilities/text/ErrorText';
import SuccessText from '../../components/utilities/text/SuccessText';
import useAdminUpdates from '../hooks/useAdminUpdates';
import useAdminInfo from '../hooks/useAdminInfo';
import styles from './Info.module.css';
import TextButton from '../../components/utilities/button/TextButton';
import Row from '../../components/utilities/container/Row';
import TextInput from '../../components/utilities/textinput/TextInput';
import axios from 'axios';
import { api, config, adminServer } from '../../constants';
import { useSelector } from 'react-redux';

const AdminInfoDetails = ({ title }) => {
	const [initialize, setInitialze] = useState(false);
	const { token } = useSelector(state => state.auth);

	const { doc, loading, error, success } = useAdminInfo();
	useEffect(() => {
		if (!loading) {
			setInitialze(true);
		}
	}, [loading]);

	const [coverOne, setCoverOne] = useState();
	const [coverTwo, setCoverTwo] = useState();
	const [coverThree, setCoverThree] = useState();
	const [coverOneRedirect, setCoverOneRedirect] = useState();
	const [coverTwoRedirect, setCoverTwoRedirect] = useState();
	const [coverThreeRedirect, setCoverThreeRedirect] = useState();
	const [edit, setEdit] = useState(false);

	const [bookOne, setBookOne] = useState();
	const [bookTwo, setBookTwo] = useState();
	const [bookThree, setBookThree] = useState();
	const [bookFour, setBookFour] = useState();
	const [bookFive, setBookFive] = useState();
	const [bookSix, setBookSix] = useState();

	const reload = () => {
		if (initialize) {
			setCoverOne(doc.doc.coverOne);
			setCoverTwo(doc.doc.coverTwo);
			setCoverThree(doc.doc.coverThree);
			setCoverOneRedirect(doc.doc.coverOneRedirect);
			setCoverTwoRedirect(doc.doc.coverTwoRedirect);
			setCoverThreeRedirect(doc.doc.coverThreeRedirect);
			setEdit(false);
		}
	};

	const update = async () => {
		try {
			console.log('Update Requested');
			const config = {
				headers: {
					'Content-Type': 'application/json',
					authorization: token,
				},
			};
			const { data } = await axios.put(
				`${adminServer}/updateInfo`,
				{
					coverOne,
					coverTwo,
					coverThree,
					coverOneRedirect,
					coverTwoRedirect,
					coverThreeRedirect,
					bookOne,
					bookTwo,
					bookThree,
					bookFour,
					bookFive,
					bookSix,
				},
				config
			);
			if (data) {
				setCoverOne(data.doc.coverOne);
				setCoverTwo(data.doc.coverTwo);
				setCoverThree(data.doc.coverThree);
				setCoverOneRedirect(data.doc.coverOneRedirect);
				setCoverTwoRedirect(data.doc.coverTwoRedirect);
				setCoverThreeRedirect(data.doc.coverThreeRedirect);
				setBookOne(data.doc.bookOne);
				setBookTwo(data.doc.bookTwo);
				setBookThree(data.doc.bookThree);
				setBookFour(data.doc.bookFour);
				setBookFive(data.doc.bookFive);
				setBookSix(data.doc.bookSix);

				console.log('Request completed');
				setEdit(false);
			}
		} catch (e) {
			const error =
				e.response && e.response ? e.response.data.message : e.message;
			console.log(error);
		}
	};

	useEffect(() => {
		if (initialize) {
			setCoverOne(doc.doc.coverOne);
			setCoverTwo(doc.doc.coverTwo);
			setCoverThree(doc.doc.coverThree);
			setCoverOneRedirect(doc.doc.coverOneRedirect);
			setCoverTwoRedirect(doc.doc.coverTwoRedirect);
			setCoverThreeRedirect(doc.doc.coverThreeRedirect);
			setBookOne(doc.doc.bookOne);
			setBookTwo(doc.doc.bookTwo);
			setBookThree(doc.doc.bookThree);
			setBookFour(doc.doc.bookFour);
			setBookFive(doc.doc.bookFive);
			setBookSix(doc.doc.bookSix);
		}
	}, [initialize]);

	if (!initialize) return <AdminLoading />;
	if (error) return <AdminError />;
	return (
		<DetailLayout>
			<ItemContainer initialValue={doc.doc} />
			<ConverContainer
				edit={edit}
				onClick={() => setEdit(true)}
				cancel={reload}
				confirm={update}>
				<Cover
					edit={edit}
					img={coverOne}
					book={coverOneRedirect}
					setImage={e => setCoverOne(e)}
					setText={e => setCoverOneRedirect(e)}
				/>
				<Cover
					edit={edit}
					img={coverTwo}
					book={coverTwoRedirect}
					setImage={e => setCoverTwo(e)}
					setText={e => setCoverTwoRedirect(e)}
				/>
				<Cover
					edit={edit}
					img={coverThree}
					book={coverThreeRedirect}
					setImage={e => setCoverThree(e)}
					setText={e => setCoverThreeRedirect(e)}
				/>
			</ConverContainer>
			<ConverContainer
				title='Khude Pick'
				edit={edit}
				onClick={() => setEdit(true)}
				cancel={reload}
				confirm={update}>
				<Book edit={edit} book={bookOne} setText={e => setBookOne(e)} />
				<Book edit={edit} book={bookTwo} setText={e => setBookTwo(e)} />
				<Book edit={edit} book={bookThree} setText={e => setBookThree(e)} />
				<Book edit={edit} book={bookFour} setText={e => setBookFour(e)} />
				<Book edit={edit} book={bookFive} setText={e => setBookFive(e)} />
				<Book edit={edit} book={bookSix} setText={e => setBookSix(e)} />
			</ConverContainer>
		</DetailLayout>
	);
};

const ConverContainer = ({
	children,
	onClick,
	edit,
	cancel,
	confirm,
	title,
}) => {
	return (
		<div className={styles.infoContainer}>
			<Row>
				<h5>{title ? title : 'Covers'}</h5>
				{edit ? (
					<Row>
						<TextButton bg onClick={confirm} color='teal'>
							Confirm
						</TextButton>
						<TextButton bg onClick={cancel} color='crimson'>
							Cancel
						</TextButton>
					</Row>
				) : (
					<TextButton bg onClick={onClick}>
						Edit
					</TextButton>
				)}
			</Row>

			{children}
		</div>
	);
};

const Cover = ({ img, book, edit, setImage, setText }) => {
	const picRef = useRef(null);

	const adImage = async val => {
		const file = val.target.files[0];
		const formData = new FormData();
		formData.append('image', file);

		try {
			const { data } = await axios.post(api.upload, formData, config.file);
			setImage(data.Location);
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<div className={styles.info}>
			<img src={img} />
			{edit && (
				<TextButton onClick={() => picRef.current.click()}>
					Change Photo
				</TextButton>
			)}
			<br />
			<input
				ref={picRef}
				type='file'
				accept='image/*'
				style={{ display: 'none', maxWidth: 100 }}
				//value={image != undefined ? image : ''}
				onChange={e => {
					adImage(e);
				}}
			/>

			{edit ? (
				<TextInput
					label='Enter book id'
					value={book}
					onChange={e => setText(e)}
				/>
			) : (
				<p>Redirect to book: {book}</p>
			)}
		</div>
	);
};

const Book = ({ img, book, edit, setImage, setText }) => {
	return (
		<div className={styles.book}>
			<img src={book?.image && book.image} alt='book' />
			{/* <p>{book?.title && book.title}</p> */}

			<br />

			{edit ? (
				<TextInput
					label='Enter book id'
					value={book?._id && book._id}
					onChange={e => setText(e)}
				/>
			) : (
				<p>{book?.title && book.title}</p>
			)}
		</div>
	);
};

const ItemContainer = ({ initialValue }) => {
	const [editing, setEditing] = useState(false);
	const [data, setData] = useState(initialValue);
	const [status, setStatus] = useState(data.status);
	const [click, setClick] = useState(false);

	const { doc, success, error, loading } = useAdminUpdates({
		value: { status },
		target: 'basic',
		click,
		id: data._id,
	});

	const on = () => {
		setEditing(true);
		setClick(false);
	};
	const update = () => {
		setClick(true);
		console.log('update');
	};
	const off = () => {
		setEditing(false);
		setStatus(data.status);
		setClick(false);
	};
	useEffect(() => {
		if (!loading) {
			if (error) {
				off();
				setClick(false);
			} else if (success) {
				setEditing(false);
				setClick(false);
				setData(doc);
			}
		}
	}, [loading]);
	return (
		<DetailContainer
			title={`Admin Info`}
			//editable
			on={on}
			off={off}
			editing={editing}
			loading={loading}
			update={update}>
			{error && <ErrorText>{error}</ErrorText>}
			{success && <SuccessText>Updated Successfully</SuccessText>}
			<DetailItems title='Field' head>
				Value
			</DetailItems>
			<DetailItems title='Id'>{data._id}</DetailItems>
			<DetailItems title='Books'>{data.books}</DetailItems>
			<DetailItems title='Chapters'>{data.chapters}</DetailItems>{' '}
			<DetailItems title='Commission'>{data.commission}%</DetailItems>
			<DetailItems title='Users'>{data.users}</DetailItems>
			<DetailItems title='Authors'>{data.authors}</DetailItems>
			<DetailItems title='Last Updated' date>
				{data.updatedAt}
			</DetailItems>
		</DetailContainer>
	);
};

export default AdminInfoDetails;
