import React, { useState, useEffect } from 'react';
import StatsLoading from './util/StatsLoading';
import PageSelector from './PageSelector';
import styles from './Admin.module.css';

const SectionLayout = ({
	children,
	count,
	loading,
	page,
	pages,
	error,
	setOnPage,
	title,
}) => {
	return (
		<>
			<h5>{title}</h5>
			<p>total doc: {count}</p>
			{!loading ? (
				<div className={styles.itemContainer}>{children}</div>
			) : (
				<StatsLoading />
			)}
			{pages && (
				<PageSelector page={page} pages={pages} setOnPage={e => setOnPage(e)} />
			)}
		</>
	);
};

export default SectionLayout;
