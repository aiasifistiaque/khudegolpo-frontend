import React from 'react';

const AdminError = ({ error }) => {
	return (
		<div
			style={{
				display: 'flex',
				padding: '4rem 0',
				alignItems: 'center',
				justifyContent: 'center',
				flex: 1,
			}}>
			<h5>{error}</h5>
		</div>
	);
};

export default AdminError;
