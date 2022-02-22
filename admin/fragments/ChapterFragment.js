import React from 'react';
import AdminItemRow from '../util/AdminItemRow';
import moment from 'moment';
import AdminItem from '../util/AdminItem';

const ChapterFragment = ({ data }) => {
	return (
		<>
			<AdminItemRow>
				<AdminItem title>Title</AdminItem>
				<AdminItem title>Type</AdminItem>
				<AdminItem title>Price</AdminItem>
				<AdminItem title>Earned</AdminItem>
				<AdminItem title>Views</AdminItem>
				<AdminItem title>Status</AdminItem>
				<AdminItem title>Created</AdminItem>
				<AdminItem title link>
					View
				</AdminItem>
			</AdminItemRow>
			{data.map((item, i) => (
				<AdminItemRow key={i}>
					<AdminItem>{item.title}</AdminItem>
					<AdminItem>{item.paid ? 'Paid' : 'Free'}</AdminItem>
					<AdminItem>{item.price} BDT</AdminItem>
					<AdminItem>{item.earned} BDT</AdminItem>
					<AdminItem>{item.views}</AdminItem>{' '}
					<AdminItem>{item.status}</AdminItem>
					<AdminItem>{moment(item.createdAt).format('MMM Do YY')}</AdminItem>
					<AdminItem link href={`/admin/chapter?uid=${item._id}`}>
						View
					</AdminItem>
				</AdminItemRow>
			))}
		</>
	);
};

export default ChapterFragment;
