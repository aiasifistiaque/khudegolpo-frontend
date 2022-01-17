import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Alert.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	alertOffAction,
	alertOnAction,
} from '../../store/actions/util/alertAction';

const Alert = ({ children, open, type }) => {
	const dispatch = useDispatch();
	const { alert } = useSelector(state => state.alert);
	const variants = {
		open: { opacity: 1, y: '0%', display: 'flex' },
		closed: { opacity: 0, y: '-150%', display: 'none' },
	};
	useEffect(() => {
		if (open) {
			dispatch(alertOnAction());
		}
	}, [open]);
	return (
		<motion.div
			animate={open ? 'open' : 'closed'}
			variants={variants}
			className={styles.container}>
			<div
				className={styles.closeButton}
				onClick={() => dispatch(alertOffAction())}>
				<img
					src='/icons/cancel-alt.png'
					alt='x'
					style={{ height: 24, width: 24 }}
				/>
			</div>
			{children}
		</motion.div>
	);
};

export default Alert;
