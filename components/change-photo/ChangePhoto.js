import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ChangePhoto.module.css';
import axios from 'axios';
import { api, editor, config } from '../../constants';
import editBookAction from '../../store/actions/books/editBookAction';
import { useRouter } from 'next/router';

const ChangePhoto = ({ id, book }) => {
	const { user, error, loading } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const router = useRouter();
	const { status: bookStatus } = useSelector(state => state.editBook);

	const picRef = useRef(null);

	const [title, setTitle] = useState(book.title);
	const [type, setType] = useState(book.type);
	const [description, setDescription] = useState(book.description);
	const [genre, setGenre] = useState(book.genre);
	const [rating, setRating] = useState(book.rating);
	const [language, setLanguage] = useState(book.language);
	const [platform, setPlatform] = useState(
		book.platform == 'all' ? 'App & WebApp' : 'App Only'
	);
	const [tag, setTag] = useState();
	const [tags, setTags] = useState(book.tags);
	const [image, setImage] = useState(book.image);
	const [status, setStatus] = useState(book.status);
	const [edited, setEdited] = useState(false);

	const [cropping, setCropping] = useState(false);

	const adImage = async val => {
		setCropping(true);
		const file = val.target.files[0];
		const formData = new FormData();
		formData.append('image', file);

		try {
			const { data } = await axios.post(api.upload, formData, config.file);
			setImage(data.Location);
			setEdited(true);
			setCropping(false);
		} catch (e) {
			console.log(e.message);
			setCropping(false);
		}
	};

	const submitChanges = () => {
		dispatch(
			editBookAction({
				id: book._id,
				image,
				title,
				description,
				genre,
				language,
				type,
				platform,
				rating,
				tags,
				status,
			})
		);
	};

	return (
		<div className={styles.container}>
			{!loading && user && user.role == 'admin' && (
				<div
					className={styles.button}
					onClick={() => {
						picRef.current.click();
					}}>
					<p>{!cropping ? 'change photo' : 'processing...'}</p>
				</div>
			)}
			{image && edited && (
				<>
					<div className={styles.button} onClick={submitChanges}>
						<p>{`Save & Update`}</p>
					</div>
					<img
						src={image}
						alt='asda'
						style={{ width: 200, height: 'auto', borderRadius: 2 }}
					/>
				</>
			)}
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
		</div>
	);
};

export default ChangePhoto;
