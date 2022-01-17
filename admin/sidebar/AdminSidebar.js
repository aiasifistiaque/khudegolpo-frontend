import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './Sidebar.module.css';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

const AdminSidebar = ({ barPressed }) => {
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

	// useEffect(() => {
	// 	setLoading(true);
	// 	const token = JSON.parse(localStorage.getItem(tokenName));
	// 	if (token) {
	// 		setIsLogged(true);
	// 		setLoading(false);
	// 	} else {
	// 		setLoading(false);
	// 	}
	// }, []);

	return (
		<>
			<h5>Menu</h5>

			<Link href={`/admin/info`}>
				<a>Dashboard</a>
			</Link>
			<Link href={`/admin/users`}>
				<a>Users</a>
			</Link>
			<Link href={`/admin/books`}>
				<a>Books</a>
			</Link>
			<Link href={`/admin/paidbooks`}>
				<a>Paid Books</a>
			</Link>
			<Link href={`/admin/refills`}>
				<a>Refills</a>
			</Link>
			<Link href={`/admin/withdraws`}>
				<a>Withdraws</a>
			</Link>
			<Link href={`/admin/purchases`}>
				<a>Purchases</a>
			</Link>
			<Link href={`/admin/reports`}>
				<a>Reports</a>
			</Link>
		</>
	);
};

export default AdminSidebar;
