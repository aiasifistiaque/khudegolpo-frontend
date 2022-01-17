import React, { useEffect, useState } from 'react';
import useAdminApi from '../hooks/useAdminApi';
import SectionLayout from '../SectionLayout';
import AdminItemRow from '../util/AdminItemRow';
import AdminItem from '../util/AdminItem';
import AdminLoading from '../util/AdminLoading';

const AdminUsers = ({ title }) => {
	const [onPage, setOnPage] = useState(1);
	const [initialize, setInitialze] = useState(false);
	const [sort, setSort] = useState();

	const { doc, loading, error, count, pages, page } = useAdminApi({
		target: 'users',
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
					<AdminItem title onClick={() => makeSort('name')}>
						Name
					</AdminItem>
					<AdminItem title onClick={() => makeSort('username')}>
						username
					</AdminItem>
					<AdminItem title onClick={() => makeSort('email')}>
						Email
					</AdminItem>
					<AdminItem title onClick={() => makeSort('createdAt')}>
						Joined
					</AdminItem>
					<AdminItem title onClick={() => makeSort('role')}>
						Role
					</AdminItem>
					<AdminItem title link>
						View
					</AdminItem>
				</AdminItemRow>
				{doc.map((item, i) => (
					<AdminItemRow>
						<AdminItem>{item.name}</AdminItem>
						<AdminItem>{item.username}</AdminItem>
						<AdminItem>{item.email}</AdminItem>
						<AdminItem date>{item.createdAt}</AdminItem>
						<AdminItem>{item.role}</AdminItem>
						<AdminItem link href={`/admin/user?uid=${item._id}`}>
							View
						</AdminItem>
					</AdminItemRow>
				))}
			</SectionLayout>
		</div>
	);
};

export default AdminUsers;
