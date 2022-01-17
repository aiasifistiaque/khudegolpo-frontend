import React from 'react';

const SmallText = ({ children, size, weight, color }) => {
	return (
		<p
			style={{
				fontSize: size || 12,
				fontWeight: weight || '600',
				color: color || 'black',
			}}>
			{children}
		</p>
	);
};

export default SmallText;
