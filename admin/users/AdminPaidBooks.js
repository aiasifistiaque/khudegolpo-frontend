import React, { useEffect, useState } from 'react';
import useAdminApi from '../hooks/useAdminApi';
import SectionLayout from '../SectionLayout';
import AdminItemRow from '../util/AdminItemRow';
import AdminItem from '../util/AdminItem';
import AdminLoading from '../util/AdminLoading';

const AdminPaidBooks = ({ title }) => {
	const [onPage, setOnPage] = useState(1);
	const [initialize, setInitialze] = useState(false);
	const [sort, setSort] = useState();

	const { doc, loading, error, count, pages, page } = useAdminApi({
		target: 'paidbooks',
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
					<AdminItem title onClick={() => makeSort('title')}>
						Title
					</AdminItem>
					<AdminItem title onClick={() => makeSort('author')}>
						Author
					</AdminItem>
					<AdminItem title onClick={() => makeSort('chapters')}>
						Chapters
					</AdminItem>
					<AdminItem title onClick={() => makeSort('platform')}>
						Platform
					</AdminItem>

					<AdminItem title onClick={() => makeSort('status')}>
						Status
					</AdminItem>
					<AdminItem title link>
						View
					</AdminItem>
				</AdminItemRow>
				{doc.map((item, i) => (
					<AdminItemRow>
						<AdminItem>{item.title}</AdminItem>
						<AdminItem>{item.author.username}</AdminItem>
						<AdminItem>{item.chapters ? item.chapters.length : 0}</AdminItem>
						<AdminItem>
							{item.platform == 'all' ? 'App & Web' : item.platform}
						</AdminItem>

						<AdminItem>{item.status}</AdminItem>
						<AdminItem link link href={`/admin/book?uid=${item._id}`}>
							View
						</AdminItem>
					</AdminItemRow>
				))}
			</SectionLayout>
		</div>
	);
};

export default AdminPaidBooks;
