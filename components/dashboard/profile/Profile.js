import React, { useState, useRef } from 'react';
import styles from './Profile.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import logoutAction from '../../../store/actions/auth/logoutAction';
import SmallText from '../../utilities/text/SmallText';
import { api, config } from '../../../constants';
import axios from 'axios';
import { editProfileAction } from '../../../store/actions/auth/updateProfileStore';

const options = [
	{ title: 'My Profile', option: 'info' },
	{ title: 'Followers', option: 'followers' },
	{ title: 'Followings', option: 'followings' },
	{ title: 'Manage Profile', option: 'manage' },
	{ title: 'Change Password', option: 'change' },
];

const Profile = ({ user }) => {
	const { name, username, image } = user;
	const router = useRouter();
	const dispatch = useDispatch();
	const { id } = router.query;

	return (
		<div className={styles.container}>
			<div className={styles.info}>
				<div className={styles.img}>
					<img src={image ? image : '/book/pp.png'} alt='profile' />
				</div>
				<div className={styles.text}>
					<ChangeImage />
					<p>{name}</p>
					<SmallText>{username}</SmallText>
				</div>
			</div>
			<div className={styles.options}>
				{options.map((option, i) => (
					<Link href={`/dashboard/${option.option}`} key={i}>
						<div
							className={id == option.option ? styles.selected : styles.option}>
							<p>{option.title}</p>
						</div>
					</Link>
				))}

				<div
					className={styles.option}
					onClick={() => {
						dispatch(logoutAction());
					}}>
					<p>Logout</p>
				</div>
			</div>
		</div>
	);
};

const ChangeImage = () => {
	const picRef = useRef(null);
	const dispatch = useDispatch();

	const adImage = async val => {
		const file = val.target.files[0];
		const formData = new FormData();
		formData.append('image', file);

		try {
			const { data } = await axios.post(api.upload, formData, config.file);

			console.log(data);
			dispatch(editProfileAction({ image: data.Location }));
		} catch (e) {
			console.log(e.message);
		}
	};
	return (
		<>
			<input
				ref={picRef}
				type='file'
				accept='image/*'
				style={{ display: 'none', maxWidth: 100 }}
				//value={image != undefined ? image : ''}
				onChange={e => {
					adImage(e);
				}}
			/>
			<a onClick={() => picRef.current.click()}>Update Picture</a>
		</>
	);
};

export default Profile;
