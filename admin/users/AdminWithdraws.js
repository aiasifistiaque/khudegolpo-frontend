import React, { useEffect, useState } from 'react';
import useAdminApi from '../hooks/useAdminApi';
import SectionLayout from '../SectionLayout';
import AdminItemRow from '../util/AdminItemRow';
import AdminItem from '../util/AdminItem';
import moment from 'moment';
import AdminLoading from '../util/AdminLoading';
import WithdrawFragment from '../fragments/WithdrawFragment';

const AdminWithdraws = ({ title }) => {
	const [onPage, setOnPage] = useState(1);
	const [initialize, setInitialze] = useState(false);
	const [sort, setSort] = useState();

	const { doc, loading, error, count, pages, page } = useAdminApi({
		target: 'withdraws',
		page: onPage,
		query: `sort=${sort}`,
	});

	const makeSort = item => {
		setSort(sort == `-${item}` ? item : `-${item}`);
	};

	useEffect(() => {
		setOnPage(1);
	}, [sort]);

	useEffect(() => {
		if (!loading) {
			setInitialze(true);
		}
	}, [loading]);
	useEffect(() => {
		if (!loading && !error) {
			if (onPage != page) {
				setOnPage(page);
			}
		}
	}, [loading]);
	if (!initialize) return <AdminLoading />;
	if (error) return <h1>{error}</h1>;
	return (
		<div>
			<SectionLayout
				title={title}
				count={count}
				pages={pages}
				page={page}
				setOnPage={e => setOnPage(e)}>
				<WithdrawFragment data={doc} sort={makeSort} />
			</SectionLayout>
		</div>
	);
};

export default AdminWithdraws;
