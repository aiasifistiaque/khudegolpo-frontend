import React from 'react';
import styles from './Text.module.css';
import moment from 'moment';

const DateText = ({ children, style }) => {
	return (
		<div className={styles.date} style={style}>
			<p>{moment(children).fromNow()}</p>
		</div>
	);
};

export default DateText;
