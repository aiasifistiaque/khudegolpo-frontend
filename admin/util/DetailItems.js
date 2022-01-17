import React from 'react';
import moment from 'moment';
import styles from '../Admin.module.css';
import Link from 'next/link';
import TextInput from '../../components/utilities/textinput/TextInput';
import AdminInput from './AdminInput';
import AdminSelect from './AdminSelect';

const DetailItems = ({
	title,
	children,
	column,
	head,
	date,
	action,
	href,
	editing,
	amount,
	data,
	onChange,
	value,
}) => {
	const child = children || 'N/A';
	return (
		<div className={styles.detailItems}>
			<div className={styles.detailItem} style={{ flex: 1 }}>
				{head ? (
					<h6>{title} </h6>
				) : (
					<p style={{ fontWeight: '500' }}>{title}</p>
				)}
			</div>
			<div className={styles.detailItem} style={{ flex: 2 }}>
				{href ? (
					<Link href={href}>
						<a>{child}</a>
					</Link>
				) : head ? (
					<h6>{child}</h6>
				) : editing ? (
					data ? (
						<AdminSelect
							data={data}
							value={value}
							onChange={e => onChange(e)}
						/>
					) : (
						<AdminInput value={value} onChange={e => onChange(e)} />
					)
				) : (
					<p>
						{date ? moment(child).format('MMMM Do YYYY, h:mm:ss a') : child}
						{amount && ' NGN'}
					</p>
				)}
			</div>
			{/* <div className={styles.item} style={{ flex: 0 }}>
				{head ? <h6>Action</h6> : <p style={{ fontWeight: '500' }}>{action}</p>}
			</div> */}
		</div>
	);
};

export default DetailItems;
