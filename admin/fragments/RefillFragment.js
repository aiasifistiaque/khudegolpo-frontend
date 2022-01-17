import React from 'react';
import AdminItemRow from '../util/AdminItemRow';
import moment from 'moment';
import AdminItem from '../util/AdminItem';

const RefillFragment = ({ data, sort }) => {
	return (
		<>
			<AdminItemRow>
				<AdminItem title onClick={() => sort('type')}>
					Type
				</AdminItem>
				<AdminItem title onClick={() => sort('status')}>
					Status
				</AdminItem>
				<AdminItem title>Amount</AdminItem>
				<AdminItem title onClick={() => sort('createdAt')}>
					Date
				</AdminItem>
				<AdminItem title link>
					View
				</AdminItem>
			</AdminItemRow>
			{data.map((item, i) => (
				<AdminItemRow key={i}>
					<AdminItem>{item.type}</AdminItem>
					<AdminItem>{item.status}</AdminItem>
					<AdminItem>{item.amount} NGN</AdminItem>
					<AdminItem>{moment(item.createdAt).format('MMM Do YY')}</AdminItem>
					<AdminItem link href={`/admin/refill?uid=${item._id}`}>
						View
					</AdminItem>
				</AdminItemRow>
			))}
		</>
	);
};

export default RefillFragment;
