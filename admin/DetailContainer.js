import React, { useState } from 'react';
import styles from './Admin.module.css';
import TextButton from '../components/utilities/button/TextButton';
import { colors } from '../constants/styles';

const DetailContainer = ({
	children,
	title,
	editable,
	on,
	off,
	editing,
	update,
	loading,
}) => {
	return (
		<div className={styles.detailContainer}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					flexWrap: 'wrap',
				}}>
				<h5>{title}</h5>
				{loading ? (
					<TextButton bg>loading</TextButton>
				) : editable ? (
					editing ? (
						<div>
							<TextButton bg color='teal' onClick={update}>
								Update
							</TextButton>
							<TextButton bg onClick={off} color={colors.danger}>
								Cancel
							</TextButton>
						</div>
					) : (
						<TextButton bg onClick={on}>
							Edit
						</TextButton>
					)
				) : null}
			</div>
			{children}
		</div>
	);
};

export default DetailContainer;
