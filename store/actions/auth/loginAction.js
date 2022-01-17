//

import { api } from '../../../constants';
import axios from 'axios';
import {
	loginRequest,
	loginSuccess,
	loginFail,
	tokenName,
} from '../../storeConstants';

const loginAction = (email, password, redirect) => async dispatch => {
	try {
		dispatch({
			type: loginRequest,
		});

		const { data } = await axios.post(
			api.login,
			{ email, password },
			api.config
		);

		dispatch({
			type: loginSuccess,
			payload: data,
		});
		if (data) {
			localStorage.setItem(tokenName, JSON.stringify(data));
		}

		document.location.href = redirect;
	} catch (error) {
		dispatch({
			type: loginFail,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export default loginAction;
