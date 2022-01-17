import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './Sidebar.module.css';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { tokenName } from '../../../store/storeConstants';
import logoutAction from '../../../store/actions/auth/logoutAction';

const Sidebar = ({ barPressed }) => {
	const springStyle = useSpring({
		from: {
			x: '-120%',
		},
		to: {
			x: !barPressed ? '-100%' : '0%',
		},
	});
	return (
		<animated.div className={styles.sidebar} style={springStyle}>
			<NavItems />
		</animated.div>
	);
};

const NavItems = () => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		setLoading(true);
		const token = JSON.parse(localStorage.getItem(tokenName));
		if (token) {
			setIsLogged(true);
			setLoading(false);
		} else {
			setLoading(false);
		}
	}, []);

	return (
		<>
			<h5>Menu</h5>
			{!loading && !isLogged ? (
				<>
					<Item href='/login'>Login</Item>
					<Item href='/register'>Register</Item>
				</>
			) : (
				<>
					<Item href='/dashboard/info'>Dashboard</Item>
					<Item href='/library'>My Library</Item>
					<Item href='/createbook'>Create Story</Item>
				</>
			)}

			<Item href='/'>Home</Item>
			<Item href='/about'>About us</Item>
			<Item href='/faq'>{`FAQ's`}</Item>
			<Item href='/privacy-policy'>Privacy Policy</Item>
			<Item href='/terms'>Terms of service</Item>

			{!loading && isLogged && (
				<a onClick={() => dispatch(logoutAction())}>Logout</a>
			)}
		</>
	);
};

const Item = ({ href, children }) => {
	return (
		<Link href={href}>
			<a>{children}</a>
		</Link>
	);
};

export default Sidebar;
