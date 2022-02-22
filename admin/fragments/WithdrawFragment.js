import React from 'react';
import AdminItemRow from '../util/AdminItemRow';
import moment from 'moment';
import AdminItem from '../util/AdminItem';

const WithdrawFragment = ({ data, sort }) => {
	return (
		<>
			<AdminItemRow>
				<AdminItem title onClick={() => sort('user')}>
					User
				</AdminItem>
				<AdminItem title>Amount</AdminItem>
				<AdminItem title onClick={() => sort('status')}>
					Status
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
					<AdminItem>{item.user.username}</AdminItem>
					<AdminItem>{item.amount} BDT</AdminItem>
					<AdminItem>{item.status}</AdminItem>
					<AdminItem>{moment(item.createdAt).format('MMM Do YY')}</AdminItem>
					<AdminItem link href={`/admin/withdraw?uid=${item._id}`}>
						View
					</AdminItem>
				</AdminItemRow>
			))}
		</>
	);
};

export default WithdrawFragment;
