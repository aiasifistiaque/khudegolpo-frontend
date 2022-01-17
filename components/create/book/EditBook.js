import React, { useState, useRef } from 'react';
import styles from './CreateBook.module.css';
import TextInput from '../../utilities/textinput/TextInput';
import Caption from '../../utilities/text/Caption';
import LongButton from '../../utilities/button/LongButton';
import LoadingButton from '../../utilities/button/LoadingButton';
import Select from '../../utilities/textinput/Select';
import { useDispatch, useSelector } from 'react-redux';
import { categories, languages } from '../../../constants/data';
import langStyle from '../../utilities/textinput/TextInput.module.css';
import { editor, api, config } from '../../../constants';
import 'react-quill/dist/quill.bubble.css';
import dynamic from 'next/dynamic';
import editBookAction from '../../../store/actions/books/editBookAction';
import TextButton from '../../utilities/button/TextButton';
import Row from '../../utilities/container/Row';
import axios from 'axios';
import ObjSelect from '../../utilities/textinput/ObjSelect';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});

const EditBook = ({ book }) => {
	const dispatch = useDispatch();
	const picRef = useRef(null);

	const { loading } = useSelector(state => state.editBook);

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

	const formats = editor.formats;
	const modules = editor.modules;

	const submitChanges = e => {
		e.preventDefault();
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

	const handleKeyPress = e => {
		if (e.code === 'Enter') {
			e.preventDefault();
			if (tag.length > 0) {
				setTags(tags => [...tags, tag]);
				setTag('');
			}
		}
	};

	return (
		<div className={styles.layout}>
			<Row column center>
				<img
					src={image ? image : '/book/book.png'}
					alt='asda'
					style={{
						width: 200,
						height: 'auto',
						borderRadius: 10,
						marginBottom: '.5rem',
					}}
				/>
				<TextButton onClick={() => picRef.current.click()}>
					Change Picture
				</TextButton>
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
			</Row>
			<div className={styles.card}>
				<h5>Edit Story</h5>
				<br />
				<form onSubmit={submitChanges}>
					<TextInput
						label='Title'
						value={title}
						onChange={e => setTitle(e)}
						required
					/>
					<p className={styles.label}>Description</p>
					<QuillNoSSRWrapper
						modules={modules}
						formats={formats}
						theme='bubble'
						className={styles.edit}
						value={description}
						onChange={e => setDescription(e)}
					/>
					<div className={styles.tagContainer}>
						{tags.map((tag, i) => (
							<div className={styles.tag} key={i}>
								<p>{tag}</p>
								<img
									src='/icons/cancel-alt.png'
									style={{ height: 14, width: 14, objectFit: 'contain' }}
									onClick={() => setTags(tags.filter(item => item !== tag))}
								/>
							</div>
						))}
					</div>
					<TextInput
						label='Tags'
						value={tag}
						onChange={e => setTag(e)}
						onKeyPress={e => handleKeyPress(e)}
					/>

					<Select
						label='Genre'
						data={categories}
						value={genre}
						onChange={e => setGenre(e)}
					/>
					<Select
						label='Publish Status'
						data={['published', 'unpublished']}
						value={status}
						onChange={e => setStatus(e)}
					/>
					<LangSelect
						label='Language'
						value={language}
						data={languages}
						onChange={e => setLanguage(e)}
						required
					/>

					<Select
						label='Free/Paid'
						data={['free', 'paid']}
						value={type}
						onChange={e => setType(e)}
					/>
					<ObjSelect
						label='Select Platform'
						data={[
							{ option: 'App & WebApp', value: 'All' },
							{ option: 'App Only', value: 'App Only' },
						]}
						value={platform}
						onChange={e => setPlatform(e)}
					/>
					<Select
						label='Adult Rating'
						data={['general', 'mature']}
						value={rating}
						onChange={e => setRating(e)}
					/>
					<Caption>
						Please read our Terms of Service for content we accept. ArewaBooks
						reserves the right to remove any inappropriate content.
					</Caption>
					<br />
					{loading ? (
						<LoadingButton />
					) : (
						<LongButton submit>Save Changes</LongButton>
					)}
				</form>
			</div>
		</div>
	);
};

const LangSelect = ({ value, onChange, data, label }) => {
	return (
		<div className={langStyle.cInput}>
			<label>{label}</label>
			<select
				value={value}
				onChange={e => {
					onChange(e.target.value);
				}}
				style={{ textTransform: 'capitalize' }}>
				{data.map((option, i) => (
					<option key={i} value={option.nativeName}>
						{option.nativeName}
					</option>
				))}
			</select>
		</div>
	);
};

export default EditBook;
