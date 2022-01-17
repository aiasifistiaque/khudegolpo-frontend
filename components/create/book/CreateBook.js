import React, { useState, useEffect, useRef } from 'react';
import styles from './CreateBook.module.css';
import TextInput from '../../utilities/textinput/TextInput';
import Caption from '../../utilities/text/Caption';
import LongButton from '../../utilities/button/LongButton';
import LoadingButton from '../../utilities/button/LoadingButton';
import Select from '../../utilities/textinput/Select';
import { useDispatch, useSelector } from 'react-redux';
import createBookAction from '../../../store/actions/books/createBookAction';
import { categories, languages } from '../../../constants/data';
import langStyle from '../../utilities/textinput/TextInput.module.css';
import axios from 'axios';
import { api, editor, config } from '../../../constants';
import 'react-quill/dist/quill.bubble.css';
import dynamic from 'next/dynamic';
import ObjSelect from '../../utilities/textinput/ObjSelect';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});

const CreateBook = () => {
	const dispatch = useDispatch();
	const picRef = useRef(null);

	const { loading, error, doc, status } = useSelector(state => state.newBook);

	const [title, setTitle] = useState();
	const [type, setType] = useState('free');
	const [description, setDescription] = useState('');
	const [tag, setTag] = useState();
	const [tags, setTags] = useState([]);
	const [genre, setGenre] = useState(categories[0]);
	const [rating, setRating] = useState('general');
	const [language, setLanguage] = useState('English');
	const [image, setImage] = useState();
	const [platform, setPlatform] = useState('All');

	const formats = editor.formats;
	const modules = editor.modules;

	const submitBook = e => {
		e.preventDefault();
		const created = {
			title,
			image,
			description,
			genre,
			language,
			type,
			platform,
			tags,
			rating,
		};
		dispatch(createBookAction(created));
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
			{image ? (
				<img
					src={image}
					alt='asda'
					style={{ width: 200, height: 'auto', borderRadius: 30 }}
				/>
			) : (
				<div
					className={styles.cover}
					onClick={() => {
						picRef.current.click();
					}}>
					<img src='/placeholderimage.png' />
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
					<p style={{ textAlign: 'center' }}>Click to add image</p>
				</div>
			)}

			<div className={styles.card}>
				<h5>Story Details</h5>
				<br />
				<form onSubmit={submitBook}>
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
					{status == 6 ? (
						<LoadingButton />
					) : (
						<LongButton submit>Save and Continue</LongButton>
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

export default CreateBook;
