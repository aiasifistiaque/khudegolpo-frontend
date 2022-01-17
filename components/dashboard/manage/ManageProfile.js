import React, { useState, useEffect } from 'react';
import styles from './Manage.module.css';
import TextInput from '../../utilities/textinput/TextInput';
import Button from '../../utilities/button/Button';
import TextBox from '../../utilities/textinput/TextBox';
import { useDispatch, useSelector } from 'react-redux';
import { editProfileAction } from '../../../store/actions/auth/updateProfileStore';
import ErrorText from '../../utilities/text/ErrorText';
import TextButton from '../../utilities/button/TextButton';
import Row from '../../utilities/container/Row';
import Link from 'next/link';

const ManageProfile = ({ user }) => {
	const [name, setName] = useState(user?.name);
	const [description, setDescription] = useState(user?.description);
	const [username, setUsername] = useState(user?.username);
	const [email, setEmail] = useState(user?.email);

	const [disabled, setDisabled] = useState(true);
	const dispatch = useDispatch();
	const { loading, error } = useSelector(state => state.updateUser);

	useEffect(() => {
		if (
			name == user.name &&
			description == user.description &&
			email == user.email &&
			username == user.username
		) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [name, description, username, email]);

	return (
		<div className={styles.container}>
			<h5>Manage Profile</h5>
			<Row style={{ marginBottom: 16 }}>
				<Link href='/unlocks'>
					<TextButton bg>Purchase History</TextButton>
				</Link>
				<Link href='/refills'>
					<TextButton bg>Refill History</TextButton>
				</Link>
				<Link href='/withdraws'>
					<TextButton bg>Withdraw History</TextButton>
				</Link>
			</Row>
			<h5>Edit Profile</h5>
			<div className={styles.box}>
				<TextInput label='Name' value={name} onChange={e => setName(e)} />
				<TextInput
					label='username'
					value={username}
					onChange={e => setUsername(e)}
				/>
				{/* <TextInput label='Email' value={email} onChange={e => setEmail(e)} /> */}

				<TextBox
					label='Description'
					value={description}
					onChange={e => setDescription(e)}
				/>
				{error && <ErrorText>{error}</ErrorText>}
				{loading ? (
					<Button loading />
				) : (
					<Button
						disabled={disabled}
						onClick={() =>
							dispatch(
								editProfileAction({ name, description, username, email })
							)
						}>
						Confirm
					</Button>
				)}
			</div>
		</div>
	);
};

export default ManageProfile;
