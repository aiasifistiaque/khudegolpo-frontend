import React, { useState } from 'react';
import styles from './CreateChapter.module.css';
import TextInput from '../../utilities/textinput/TextInput';
import SmallButton from '../../utilities/button/SmallButton';
import { useSelector, useDispatch } from 'react-redux';
import LoadingInnerPage from '../../utilities/page/LoadingInnerPage';
import Button from '../../utilities/button/Button';
import createChapterAction from '../../../store/actions/books/createChapterAction';
import LoadingButton from '../../utilities/button/LoadingButton';
import 'react-quill/dist/quill.bubble.css';
import dynamic from 'next/dynamic';
import Select from '../../utilities/textinput/Select';
import typeStyle from '../../utilities/textinput/TextInput.module.css';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading ...</p>,
});

const CreateChapter = () => {
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
	const { book, loading, error } = useSelector(state => state.book);
	const { image, title } = book;
	const { status } = useSelector(state => state.newChapter);

	const [name, setName] = useState();
	const [story, setStory] = useState('');
	const [paid, setPaid] = useState(false);
	const [price, setPrice] = useState(0);

	const create = () => {
		const newChapter = {
			title: name,
			description: story,
			book: book._id,
			paid,
			price,
		};
		dispatch(createChapterAction(newChapter));
	};

	if (loading) return <LoadingInnerPage />;
	else
		return (
			<div className={styles.layout}>
				<div className={styles.topContainer}>
					<div className={styles.info}>
						<img src={image} alt={title} />
						<div className={styles.text}>
							<h6>{title}</h6>
							<h5>{name || 'Untitled Story'}</h5>
						</div>
					</div>
					<div className={styles.buttons}>
						{/* <SmallButton>Save</SmallButton>
						<SmallButton>Preview</SmallButton> */}
						<SmallButton onClick={create}>Save</SmallButton>
					</div>
				</div>
				<div className={styles.bottomContainer}>
					<TextInput
						label='Chapter Name'
						value={name}
						onChange={e => setName(e)}
					/>
					{/* <div className={styles.editor}></div> */}
					<QuillNoSSRWrapper
						modules={modules}
						formats={formats}
						theme='bubble'
						className={styles.edit}
						value={story}
						onChange={e => setStory(e)}
					/>

					<br />

					{book.type == 'paid' && (
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
									label='Price (BDT)'
									value={price}
									onChange={e => setPrice(e)}
									type='number'
								/>
							)}
						</>
					)}
					{status == 6 ? (
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

export default CreateChapter;
