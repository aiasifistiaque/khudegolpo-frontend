import React from 'react';
import AdminItem from '../util/AdminItem';
import AdminItemRow from '../util/AdminItemRow';

const PurchaseFragment = ({ data, sort }) => {
	return (
		<>
			<AdminItemRow>
				<AdminItem title onClick={() => sort('chapter')}>
					Chapter
				</AdminItem>
				<AdminItem title onClick={() => sort('book')}>
					Book
				</AdminItem>
				<AdminItem title onClick={() => sort('author')}>
					Author
				</AdminItem>
				<AdminItem title onClick={() => sort('price')}>
					Price
				</AdminItem>
				<AdminItem title onClick={() => sort('createdAt')}>
					Date
				</AdminItem>
				<AdminItem title link>
					View
				</AdminItem>
			</AdminItemRow>
			{data.map((item, i) => (
				<AdminItemRow key={i}>
					<AdminItem>{item.chapter.title}</AdminItem>
					<AdminItem>{item.book.title}</AdminItem>
					<AdminItem>{item.author.username}</AdminItem>
					<AdminItem>{item.price} BDT</AdminItem>
					<AdminItem date>{item.createdAt}</AdminItem>
					<AdminItem link href={`/admin/purchase?uid=${item._id}`}>
						View
					</AdminItem>
				</AdminItemRow>
			))}
		</>
	);
};

export default PurchaseFragment;
