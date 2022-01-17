import axios from 'axios';
import { api } from '../../constants';
import {
	loginRequest,
	loginSuccess,
	loginFail,
	tokenName,
} from '../storeConstants';

export const socialLoginAction = query => async (dispatch, getState) => {
	try {
		dispatch({ type: loginRequest });
		const { data } = await axios.post(
			`${api.domain}/auth/facebook/verify?code=${query.code}`,
			query,
			api.config
		);

		localStorage.setItem(tokenName, JSON.stringify(data));
		document.location.href = '/';

		dispatch({
			type: loginSuccess,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: loginFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};
