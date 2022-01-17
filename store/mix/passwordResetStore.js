import axios from 'axios';
import { api } from '../../constants';

const otpRequest = 'OTP_REQUEST';
const otpSuccess = 'OTP_SUCCESS';
const otpFail = 'OTP_FAIL';
const forgotPasswordInitiate = 'FORGOT_PASSWORD_INITIATE';
const updatePassowordRequest = 'UPDATE_PASSWORD_REQUEST';
const updatePassowordSuccess = 'UPDATE_PASSWORD_SUCCESS';
const updatePassowordFail = 'UPDATE_PASSWORD_FAIL';

export const forgotPasswordReducer = (
	state = { loading: true, status: 'initial' },
	action
) => {
	switch (action.type) {
		case forgotPasswordInitiate:
			return {
				status: 'initial',
				loading: false,
			};
		case otpRequest:
			return {
				status: 'otp-requested',
				loading: true,
			};
		case otpSuccess:
			return {
				loading: false,
				status: 1,
				status: 'otp-success',
			};
		case otpFail:
			return {
				loading: false,
				error: action.payload,
				status: 'otp-fail',
			};
		case updatePassowordRequest:
			return {
				...state,
				loading: true,
			};
		case updatePassowordSuccess:
			return {
				...state,
				loading: false,
				status: 'updated',
			};
		case updatePassowordFail:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const forgotPasswordInitiateAction = () => async (
	dispatch,
	getState
) => {
	dispatch({ type: forgotPasswordInitiate });
};

export const sendOtpAction = email => async (dispatch, getState) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		dispatch({ type: otpRequest });
		const { data } = await axios.post(
			`${api.server}/auth/sendotp`,
			{ email: email },
			config
		);

		dispatch({ type: otpSuccess, payload: data });
	} catch (error) {
		dispatch({
			type: otpFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export const resetPasswordAction = obj => async (dispatch, getState) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		dispatch({ type: updatePassowordRequest });
		const { data } = await axios.post(
			`${api.server}/auth/resetpassword`,
			obj,
			config
		);

		dispatch({ type: updatePassowordSuccess, payload: data });
	} catch (error) {
		console.log(error.message);

		dispatch({
			type: updatePassowordFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};
