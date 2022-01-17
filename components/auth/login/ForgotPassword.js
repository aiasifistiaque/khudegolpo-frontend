import React, { useState } from 'react';
import styles from './Login.module.css';
import TextInput from '../../utilities/textinput/TextInput';
import Container from '../../utilities/container/Container';
import Button from '../../utilities/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
	sendOtpAction,
	resetPasswordAction,
} from '../../../store/mix/passwordResetStore';

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState();
	const [otp, setOtp] = useState('');
	const [password, setPassword] = useState('');
	const [confirm, setConfirm] = useState('');

	const { status, error, loading } = useSelector(state => state.forgotPassword);

	const SendOTPButton = () => {
		dispatch(sendOtpAction(email));
	};

	if (status == 'initial' || status == 'otp-fail' || status == 'otp-requested')
		return (
			<>
				<Container>
					<h5>Reset Password</h5>
					<p style={{ margin: '8px 0 16px 0' }}>
						An One Time Password will be sent to your email address
					</p>
				</Container>
				<TextInput
					placeholder='Enter your email address'
					value={email}
					onChange={e => setEmail(e)}
				/>
				<Container>
					<OTPButton email={email} onClick={SendOTPButton}>
						Send Otp
					</OTPButton>
				</Container>
			</>
		);
	else if (status == 'otp-success')
		return (
			<>
				<Container>
					<h5>Reset Password</h5>
					<p style={{ margin: '8px 0 16px 0' }}>
						Enter The One Time Password Sent to your email address: {email}
					</p>
				</Container>
				<TextInput
					placeholder='Enter OTP'
					value={otp}
					onChange={e => setOtp(e)}
				/>
				<TextInput
					password
					placeholder='New Password'
					value={password}
					onChange={e => setPassword(e)}
				/>
				<TextInput
					password
					placeholder='Confirm New Password'
					value={confirm}
					onChange={e => setConfirm(e)}
				/>
				<Container>
					<UpdateButton
						password={password}
						confirm={confirm}
						otp={otp}
						onClick={() =>
							dispatch(resetPasswordAction({ email, password, otp }))
						}>
						Proceed
					</UpdateButton>
				</Container>
			</>
		);

	return null;
};

const OTPButton = ({ email, onClick, children }) => {
	const { status, error, loading } = useSelector(state => state.forgotPassword);

	if (loading) return <Button disabled>loading...</Button>;
	if (!email) return <Button disabled>{children}</Button>;
	if (!email) return <Button disabled>{children}</Button>;
	else return <Button onClick={onClick}>{children}</Button>;
};

const UpdateButton = ({ email, onClick, children, password, confirm, otp }) => {
	const { status, error, loading } = useSelector(state => state.forgotPassword);

	if (loading) return <Button disabled>loading...</Button>;
	if (password?.length < 8) return <Button disabled>{children}</Button>;
	if (password != confirm) return <Button disabled>{children}</Button>;
	if (otp?.length < 2) return <Button disabled>{children}</Button>;

	return <Button onClick={onClick}>{children}</Button>;
};

export default ForgotPassword;
