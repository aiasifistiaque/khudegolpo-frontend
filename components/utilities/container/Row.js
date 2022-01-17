import React from 'react';

const Row = ({ children, center, column, wrap, style, onClick }) => {
	const flexWrap = wrap ? { flexWrap: 'wrap' } : {};
	const position = center
		? { alignItems: 'center', justifyContent: 'center' }
		: {};
	const direction = column ? 'column' : 'row';

	return (
		<div
			onClick={onClick}
			style={{
				display: 'flex',
				flexDirection: direction,
				...position,
				...flexWrap,
				...style,
			}}>
			{children}
		</div>
	);
};

export default Row;
