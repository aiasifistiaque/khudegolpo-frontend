import React, { useEffect, useState } from 'react';
import styles from './Manage.module.css';
import TextInput from '../../utilities/textinput/TextInput';
import Button from '../../utilities/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
	changePasswordInitiateAction,
	changePasswordAction,
} from '../../../store/mix/passwordChangeStore';
import ErrorText from '../../utilities/text/ErrorText';
import SuccessText from '../../utilities/text/SuccessText';

const ChangePassword = () => {
	const dispatch = useDispatch();
	const [password, setPassword] = useState('');
	const [newPass, setNewPass] = useState();
	const [con, setConfirm] = useState();
	const { loading, error, success } = useSelector(
		state => state.changePassword
	);

	useEffect(() => {
		dispatch(changePasswordInitiateAction());
	}, []);

	return (
		<div className={styles.container}>
			<h5>Change password</h5>
			<div className={styles.box}>
				<TextInput
					password
					label='Old Password'
					value={password}
					onChange={e => setPassword(e)}
				/>
				<TextInput
					password
					label='New Password (min 8 characters)'
					value={newPass}
					onChange={e => setNewPass(e)}
				/>
				<TextInput
					password
					label='Confirm Password'
					value={con}
					onChange={e => setConfirm(e)}
				/>
				<Btn
					password={password}
					newPass={newPass}
					con={con}
					value={password}
					onChange={e => setPassword(e)}
				/>
				{error && <ErrorText>{error}</ErrorText>}
			</div>
		</div>
	);
};

const Btn = ({ password, newPass, con }) => {
	const dispatch = useDispatch();
	const { loading, error, success } = useSelector(
		state => state.changePassword
	);

	if (success) return <SuccessText>Password Updated Successfully</SuccessText>;
	if (loading) return <Button disabled>loading...</Button>;
	if (!password || !newPass) return <Button disabled>Update</Button>;
	if (newPass?.length < 8) return <Button disabled>Update</Button>;
	if (newPass != con) return <Button disabled>Update</Button>;
	return (
		<Button
			onClick={() =>
				dispatch(changePasswordAction({ password, newpass: newPass }))
			}>
			Update
		</Button>
	);
};

export default ChangePassword;
