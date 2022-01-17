import React from 'react';
import styles from './Container.module.css';
import moment from 'moment';
import { colors } from '../../../constants/styles';

const RowItem = ({ children, date, tag }) => {
	return (
		<div
			className={tag ? styles.rowTag : styles.rowItem}
			style={
				tag && {
					backgroundColor:
						children == 'rejected'
							? colors.danger
							: children == 'refunded'
							? 'lightGreen'
							: children == 'successful'
							? 'lightGreen'
							: children == 'completed'
							? 'lightGreen'
							: colors.darkSmoke,
				}
			}>
			<p>{date ? moment(children).format('MMM Do YY') : children}</p>
		</div>
	);
};

export default RowItem;
