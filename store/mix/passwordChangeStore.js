import axios from 'axios';
import { api } from '../../constants';

const changePasswordInitiate = 'CHANGE_PASSWORD_INITIATE';
const changePasswordRequest = 'CHANGE_PASSWORD_REQUEST';
const changePasswordSuccess = 'CHANGE_PASSWORD_SUCCESS';
const changePassowordFail = 'CHANGE_PASSWORD_FAIL';

export const changePasswordReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case changePasswordRequest:
			return {
				loading: true,
			};
		case changePasswordSuccess:
			return {
				success: true,
				loading: true,
			};
		case changePassowordFail:
			return {
				loading: false,
				error: action.payload,
			};
		case changePasswordInitiate:
			return {
				loading: false,
				success: false,
				error: false,
				pay: action.payload,
			};

		default:
			return state;
	}
};

export const changePasswordInitiateAction = () => async (
	dispatch,
	getState
) => {
	dispatch({ type: changePasswordInitiate, payload: 'baal' });
};

export const changePasswordAction = obj => async (dispatch, getState) => {
	try {
		const { token } = getState().auth;

		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: changePasswordRequest });
		const { data } = await axios.post(
			`${api.server}/auth/changepassword`,
			obj,
			config
		);

		dispatch({ type: changePasswordSuccess, payload: data });
	} catch (error) {
		console.log(error.message);

		dispatch({
			type: changePassowordFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};
