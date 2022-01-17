import React, { useState, useEffect } from 'react';
import styles from './CreateChapter.module.css';
import TextInput from '../../utilities/textinput/TextInput';
import SmallButton from '../../utilities/button/SmallButton';
import { useSelector, useDispatch } from 'react-redux';
import LoadingInnerPage from '../../utilities/page/LoadingInnerPage';
import Button from '../../utilities/button/Button';
import editChapterAction from '../../../store/actions/books/editChapterAction';
import LoadingButton from '../../utilities/button/LoadingButton';
import 'react-quill/dist/quill.bubble.css';
import dynamic from 'next/dynamic';
import typeStyle from '../../utilities/textinput/TextInput.module.css';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});

const EditChapter = () => {
	const formats = [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
	];
	const dispatch = useDispatch();
	const { chapter, loading, error } = useSelector(state => state.chapter);
	const { status } = useSelector(state => state.newChapter);
	const edit = useSelector(state => state.editChapter);

	const [name, setName] = useState();
	const [story, setStory] = useState('');
	const [paid, setPaid] = useState(false);
	const [price, setPrice] = useState();
	const [id, setId] = useState();

	const create = () => {
		const newChapter = {
			id,
			title: name,
			description: story,
			paid,
			price,
		};
		dispatch(editChapterAction(newChapter));
	};

	useEffect(() => {
		if (!loading && chapter) {
			setStory(chapter.description);
			setName(chapter.title);
			setPaid(chapter.paid);
			setPrice(chapter.price);
			setId(chapter._id);
		}
	}, [loading]);

	if (loading) return <LoadingInnerPage />;
	else
		return (
			<div className={styles.layout}>
				<div className={styles.topContainer}>
					<div className={styles.info}>
						<img
							src={chapter.book ? chapter.book.image : '/book/book.png'}
							alt={chapter.title}
						/>
						<div className={styles.text}>
							<h6>{chapter.book.title}</h6>
							<h5>{name}</h5>
						</div>
					</div>
					<div className={styles.buttons}>
						{/* <SmallButton>Save</SmallButton>
						<SmallButton>Preview</SmallButton> */}
						<SmallButton>Save</SmallButton>
					</div>
				</div>
				<div className={styles.bottomContainer}>
					<TextInput
						label='Chapter Name'
						value={name}
						onChange={e => setName(e)}
					/>
					<QuillNoSSRWrapper
						modules={modules}
						formats={formats}
						theme='bubble'
						className={styles.edit}
						value={story}
						onChange={e => setStory(e)}
					/>
					{chapter.book.type == 'paid' && (
						<>
							<TypeSelect
								label='Paid/Free'
								value={paid}
								onChange={e => setPaid(e)}
								data={[
									{ title: 'Free', value: false },
									{ title: 'Paid', value: true },
								]}
							/>
							{paid && (
								<TextInput
									label='Price'
									value={price}
									onChange={e => setPrice(e)}
									type='number'
								/>
							)}
						</>
					)}

					<br />

					{edit.loading ? (
						<LoadingButton />
					) : (
						<Button onClick={create}>Save Story</Button>
					)}
				</div>
			</div>
		);
};

const TypeSelect = ({ value, onChange, data, label }) => {
	return (
		<div className={typeStyle.cInput}>
			<label>{label}</label>
			<select
				value={value}
				onChange={e => {
					onChange(e.target.value);
				}}
				style={{ textTransform: 'capitalize' }}>
				{data.map((option, i) => (
					<option key={i} value={option.value}>
						{option.title}
					</option>
				))}
			</select>
		</div>
	);
};

const modules = {
	toolbar: [
		['bold', 'italic', 'underline'],
		[{ indent: '-1' }, { indent: '+1' }],
		['clean'],
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
	},
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */

export default EditChapter;
