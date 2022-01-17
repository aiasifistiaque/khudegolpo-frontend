import React, { useEffect, useState } from 'react';
import useAdminApi from '../hooks/useAdminApi';
import SectionLayout from '../SectionLayout';
import AdminItemRow from '../util/AdminItemRow';
import AdminItem from '../util/AdminItem';
import moment from 'moment';
import AdminLoading from '../util/AdminLoading';

const AdminReports = ({ title }) => {
	const [onPage, setOnPage] = useState(1);
	const [initialize, setInitialze] = useState(false);
	const [sort, setSort] = useState();

	const { doc, loading, error, count, pages, page } = useAdminApi({
		target: 'reports',
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
				<AdminItemRow>
					<AdminItem title onClick={() => makeSort('category')}>
						Category
					</AdminItem>
					<AdminItem title onClick={() => makeSort('type')}>
						Target
					</AdminItem>
					<AdminItem title onClick={() => makeSort('status')}>
						Status
					</AdminItem>
					<AdminItem title onClick={() => makeSort('createdAt')}>
						Date
					</AdminItem>
					<AdminItem title link>
						View
					</AdminItem>
				</AdminItemRow>
				{doc.map((item, i) => (
					<AdminItemRow>
						<AdminItem>{item.category}</AdminItem>
						<AdminItem>{item.type}</AdminItem>
						<AdminItem>{item.staus}</AdminItem>
						<AdminItem>{moment(item.createdAt).format('MMM Do YY')}</AdminItem>
						<AdminItem link href={`/admin/report?uid=${item._id}`}>
							View
						</AdminItem>
					</AdminItemRow>
				))}
			</SectionLayout>
		</div>
	);
};

export default AdminReports;
