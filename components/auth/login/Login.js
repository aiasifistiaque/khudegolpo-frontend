import React, { useState } from 'react';
import styles from './Login.module.css';
import TextInput from '../../utilities/textinput/TextInput';
import Container from '../../utilities/container/Container';
import Button from '../../utilities/button/Button';
import Caption from '../../utilities/text/Caption';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import LoadingButton from '../../utilities/button/LoadingButton';
import loginAction from '../../../store/actions/auth/loginAction';
import ErrorText from '../../utilities/text/ErrorText';
import validateEmail from '../../../functions/validateEmail';
import Link from 'next/link';
import ToAuth from './ToAuth';
import { api } from '../../../constants';
import Row from '../../utilities/container/Row';

const Login = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { from } = router.query;

	const { loading, error } = useSelector(state => state.login);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [validationError, setValidationError] = useState(false);
	const [validationErrorText, setValidationErrorText] = useState('');

	const loginUser = () => {
		setValidationError(false);

		(email.length < 1 || !validateEmail(email) || password.length < 1) &&
			setValidationError(true);

		if (email.length < 1) {
			setValidationErrorText('Email is Required');
		} else if (!validateEmail(email)) {
			setValidationErrorText('Email is incorrectly formatted');
		} else if (password.length < 1) {
			setValidationErrorText('Password is Required');
		}
		const redirect = from || 'home';
		!validationError && dispatch(loginAction(email, password, `/${redirect}`));
	};

	const handleKeyPress = e => {
		if (e.code === 'Enter') {
			loginUser();
		}
	};

	return (
		<div className={styles.login}>
			<Container>
				<h5>Login</h5>
				{error ? (
					<ErrorText>{error}</ErrorText>
				) : (
					validationError && <ErrorText>{validationErrorText}</ErrorText>
				)}
			</Container>
			<br />
			<TextInput
				label='Email'
				placeholder='Email'
				value={email}
				onChange={e => setEmail(e)}
				onKeyPress={e => handleKeyPress(e)}
			/>
			<TextInput
				label='Password'
				placeholder='Password'
				value={password}
				onChange={e => setPassword(e)}
				password
				onKeyPress={e => handleKeyPress(e)}
			/>
			<Link href='/forgotpassword'>
				<a className={styles.forgot}>Forgot Password?</a>
			</Link>

			<Container>
				{loading ? (
					<LoadingButton />
				) : (
					<Button onClick={loginUser}>Log In</Button>
				)}

				<Caption>
					By proceeding, you agree to our <a>Terms of Use </a>
					<br /> and
					<a> Privacy Policy</a>
				</Caption>
				{/* <div style={{ width: '100%' }}>
					<p style={{ margin: '1rem 0', textAlign: 'center' }}>Or,</p>
				</div>
				<Row wrap center>
					<SocialButton>facebook</SocialButton>
					<SocialButton>google</SocialButton>
				</Row> */}

				<ToAuth href='register'>New User?</ToAuth>
			</Container>
		</div>
	);
};

const SocialButton = ({ children }) => {
	return (
		<a
			href={`${api.domain}/auth/${children}`}
			style={{
				color: 'black',
				padding: '1rem',
				borderRadius: 30,
				textDecorationLine: 'none',
				fontWeight: '500',
				fontSize: 14,
				width: '80%',
				height: 44,
				display: 'flex',
				alignItems: 'center',
				margin: '.4rem',
				paddingLeft: 0,
				border: '2px solid black',
				display: 'flex',
				justifyContent: 'center',
				gap: '1rem',
			}}>
			<img
				src={`/icons/${children}.png`}
				alt={children}
				style={{
					height: 24,
					width: 24,
					objectFit: 'contain',
					marginRight: 0,
				}}
			/>
			<p style={{ fontSize: 14, fontWeight: '700' }}>
				Continue with {children}
			</p>
		</a>
	);
};

export default Login;
