import React, { useState, useEffect } from 'react';
import styles from './Search.module.css';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import TextInput from '../utilities/textinput/TextInput';
import searchBooksAction from '../../store/actions/books/searchBooksAction';

const Search = ({ active, off }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { searchResult, loading, error } = useSelector(state => state.search);

	const [searchString, setSearchString] = useState('');

	useEffect(() => {
		searchString.length > 0 && dispatch(searchBooksAction(searchString));
	}, [searchString]);

	const variants = {
		open: { opacity: 1, y: '0%' },
		closed: { opacity: 0, y: '-100%' },
	};
	return (
		<motion.div
			animate={active ? 'open' : 'closed'}
			variants={variants}
			className={
				active
					? `${styles.searchPanel} ${
							searchResult &&
							searchResult.length > 1 &&
							searchString.length > 0 &&
							styles.panelExpand
					  }`
					: styles.searchHidden
			}>
			<div onClick={off} className={styles.closeIcon}>
				{/* <FontAwesomeIcon icon={faTimes} height={20} className={styles.icon} /> */}
			</div>

			<div className={styles.inputContainer}>
				{/* <SearchInput
					value={searchString}
					onChange={e => setSearchString(e)}
					placeholder='Search'
				/> */}
				<TextInput
					value={searchString}
					onChange={e => setSearchString(e)}
					placeholder='Search'
				/>
			</div>

			{searchString.length == 0 ? (
				<InitText>Search for a book</InitText>
			) : loading ? (
				<SearchLoading />
			) : searchResult && searchResult.length < 1 ? (
				<InitText>No Books Found</InitText>
			) : (
				<SearchProductContainer>
					{searchResult &&
						searchResult.books &&
						searchResult.books.map &&
						searchResult.books.map((item, i) => (
							<SearchProducts
								item={item}
								key={i}
								onClick={() => {
									off();
									router.push(`/book?id=${item._id}`);
								}}
							/>
						))}
					{searchResult &&
						searchResult.users &&
						searchResult.users.map &&
						searchResult.users.map((item, i) => (
							<SearchUsers
								item={item}
								key={i}
								onClick={() => {
									off();
									router.push(`/u/${item?.username && item.username}`);
								}}
							/>
						))}
				</SearchProductContainer>
			)}
		</motion.div>
	);
};

const SearchLoading = () => {
	return (
		<div className={styles.searchLoading}>
			<h5>loading...</h5>
		</div>
	);
};

const InitText = ({ children }) => {
	return (
		<div className={styles.searchLoading}>
			<h5>{children}</h5>
		</div>
	);
};

const SearchProductContainer = ({ children }) => {
	return <div className={styles.spCardContainer}>{children}</div>;
};

const SearchProducts = ({ item, onClick }) => {
	return (
		<div className={styles.spCard} onClick={onClick}>
			<Image
				unoptimized={true}
				src={item.image}
				alt={item.title}
				height={100}
				width={75}
				objectFit='cover'
				style={{ borderRadius: 4 }}
			/>
			<div className={styles.cardText}>
				<h5>{item.title}</h5>
			</div>
		</div>
	);
};

const SearchUsers = ({ item, onClick }) => {
	return (
		<div className={styles.spCard} onClick={onClick}>
			<Image
				unoptimized={true}
				src={item?.image && item.image}
				alt={item?.username && item.username}
				height={50}
				width={50}
				objectFit='cover'
				style={{ borderRadius: '99px' }}
			/>
			<div className={styles.cardText}>
				<h6>{item?.name && item.name}</h6>
				<p>{item?.username && item.username}</p>
			</div>
		</div>
	);
};

export default Search;
