import React, { useEffect } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import useAuth from '../../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import getProfileAction from '../../../store/actions/auth/getProfileAction';
import Button from '../../utilities/button/Button';
import useNewNotifications from '../../../hooks/useNewNotification';
import Row from '../../utilities/container/Row';
import { useRouter } from 'next/router';

const Header = ({ barPressed, open, close, on, search, onClick }) => {
	//const { loading, isLoggedIn } = useAuth();
	const router = useRouter();
	const notifications = useNewNotifications();
	const dispatch = useDispatch();
	const { loggedIn } = useSelector(state => state.auth);
	useEffect(() => {
		dispatch(getProfileAction());
	}, []);
	return (
		<div className={styles.header} onClick={onClick}>
			<div className={styles.name}>
				<div className={styles.menuIcon} onClick={barPressed ? close : open}>
					<img src='/icons/menu-white2.png' alt='menu icon' />
				</div>

				<Row
					style={{ alignItems: 'center', cursor: 'pointer' }}
					onClick={() => {
						loggedIn ? router.push('/home') : router.push('/');
					}}>
					<img
						src='/headerlogo.png'
						style={{
							width: 28,
							height: 28,
							objectFit: 'contain',
							marginRight: 12,
						}}
					/>
					<h5
						style={{
							letterSpacing: -3,
							fontWeight: '500',
						}}>{`Khude   Golpo`}</h5>
				</Row>
			</div>
			{loggedIn ? (
				<>
					<div className={styles.options}>
						<div className={styles.option} onClick={on}>
							<img
								src={search ? `/icons/cancel.png` : `/icons/search.png`}
								alt='search'
							/>
						</div>

						<Option
							icon={
								notifications?.status == 1 ? 'notification-red' : 'notification'
							}
							to='/notifications'
						/>

						<Profile to={loggedIn ? '/dashboard/info' : '/login'} />
					</div>
				</>
			) : (
				<Link href='/login'>
					<a style={{ cursor: 'pointer' }}>Login</a>
				</Link>
			)}
		</div>
	);
};

const Option = ({ icon, to }) => {
	return (
		<Link href={to}>
			<div className={styles.option}>
				<img src={`/icons/${icon}.png`} alt='menu icon' />
			</div>
		</Link>
	);
};

const Profile = ({ icon, to }) => {
	const { user } = useSelector(state => state.user);
	return (
		<Link href={to}>
			<div className={user?.image ? styles.pOption : styles.option}>
				<img
					src={user?.image ? user.image : `/icons/profile.png`}
					alt='menu icon'
				/>
			</div>
		</Link>
	);
};

export default Header;
