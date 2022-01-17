import React, { useEffect } from 'react';
import Page from '../components/utilities/page/Page';
import Login from '../components/auth/login/Login';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';
import ForgotPassword from '../components/auth/login/ForgotPassword';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordInitiateAction } from '../store/mix/passwordResetStore';
import ErrorText from '../components/utilities/text/ErrorText';
import Container from '../components/utilities/container/Container';
import Row from '../components/utilities/container/Row';
import LoginContainer from '../components/auth/login/LoginContainer';
import SuccessText from '../components/utilities/text/SuccessText';
import TextButton from '../components/utilities/button/TextButton';

const ForgotpasswordPage = () => {
	const auth = useAuth();
	const router = useRouter();
	const dispatch = useDispatch();

	const { status, loading, error } = useSelector(state => state.forgotPassword);

	useEffect(() => {
		if (auth.isLoggedIn) {
			router.replace('/home');
		}
	}, [auth.isLoggedIn]);

	useEffect(() => {
		dispatch(forgotPasswordInitiateAction());
	}, []);

	if (auth.loading || auth.isLoggedIn) return null;
	return (
		<Page>
			<LoginContainer>
				{status == 'updated' ? (
					<>
						<SuccessText>Password Updated Successfully</SuccessText>
						<TextButton bg onClick={() => router.replace('/login')}>
							Back to login
						</TextButton>
					</>
				) : (
					<>
						<ForgotPassword />
						{status == 'otp-success' && !error && (
							<SuccessText>Otp has been sent to your email</SuccessText>
						)}
						{status == 'otp-success' && null}
						{error && <ErrorText>{error}</ErrorText>}
					</>
				)}
			</LoginContainer>
		</Page>
	);
};

export default ForgotpasswordPage;
