import React from 'react';

const StoreIcons = () => {
	return (
		<>
			<img
				src='/appstore.png'
				alt='app'
				style={{
					height: 40,
					width: 140,
					objectFit: 'contain',
				}}
			/>
			<img
				src='/playstore.png'
				alt='play'
				style={{
					height: 40,
					width: 140,
					objectFit: 'contain',
				}}
			/>
		</>
	);
};

export default StoreIcons;
