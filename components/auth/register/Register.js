import React, { useState } from 'react';
import styles from './Register.module.css';
import TextInput from '../../utilities/textinput/TextInput';
import Container from '../../utilities/container/Container';
import Button from '../../utilities/button/Button';
import LoadingButton from '../../utilities/button/LoadingButton';
import Caption from '../../utilities/text/Caption';
import validateEmail from '../../../functions/validateEmail';
import ErrorText from '../../utilities/text/ErrorText';
import { useDispatch, useSelector } from 'react-redux';
import registerAction from '../../../store/actions/auth/registerAction';
import ToAuth from '../login/ToAuth';

const Register = () => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector(state => state.signup);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [validationError, setValidationError] = useState(false);
	const [validationErrorText, setValidationErrorText] = useState('');

	const registerUser = () => {
		setValidationError(false);
		setValidationErrorText('');
		(name.length < 1 ||
			email.length < 4 ||
			!validateEmail(email) ||
			password.length < 7 ||
			password != confirmPassword) &&
			setValidationError(true);

		if (name.length < 1) {
			setValidationErrorText('Name is Required');
		} else if (name.length < 4) {
			setValidationErrorText('Name must be 4 characters long');
		} else if (email.length < 1) {
			setValidationErrorText('Email is Required');
		} else if (!validateEmail(email)) {
			setValidationErrorText('Email is incorrectly formatted');
		} else if (username.length < 1) {
			setValidationErrorText('username is Required');
		} else if (password.length < 1) {
			setValidationErrorText('Password is Required');
		} else if (password.length < 1) {
			setValidationErrorText('Passwords is required');
		} else if (password.length < 7) {
			setValidationErrorText('Passwords must be 6 characters long');
		} else if (password != confirmPassword) {
			setValidationErrorText('Passwords do not match');
		}
		!validationError &&
			dispatch(registerAction(name, email, username, password));
	};

	return (
		<div className={styles.register}>
			<Container>
				<h5>REGISTER</h5>
				{error ? (
					<ErrorText>{error}</ErrorText>
				) : (
					validationError && <ErrorText>{validationErrorText}</ErrorText>
				)}
			</Container>
			<br />

			<TextInput
				label='Name'
				placeholder='Name'
				value={name}
				onChange={e => setName(e)}
			/>

			<TextInput
				label='Email'
				placeholder='email'
				value={email}
				onChange={e => setEmail(e)}
			/>
			<TextInput
				label='Username'
				placeholder='username'
				value={username}
				onChange={e => setUsername(e)}
			/>
			<TextInput
				label='Password'
				placeholder='password'
				value={password}
				onChange={e => setPassword(e)}
				password
			/>
			<TextInput
				label='Confirm Password'
				placeholder='confirm password'
				value={confirmPassword}
				onChange={e => setConfirmPassword(e)}
				password
			/>
			<Container>
				{loading ? (
					<LoadingButton />
				) : (
					<Button onClick={registerUser}>Register</Button>
				)}

				<Caption>
					By proceeding, you agree to our <a>Terms of Use </a>
					<br /> and
					<a> Privacy Policy</a>
				</Caption>
				<ToAuth href='login'>Alredy Registered?</ToAuth>
			</Container>
		</div>
	);
};

export default Register;
