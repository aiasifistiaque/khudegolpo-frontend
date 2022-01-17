//

import loginAction from './loginAction';
import { api } from '../../../constants';
import axios from 'axios';
import { signupRequest, signupFail } from '../../storeConstants';

const registerAction = (name, email, username, password) => async dispatch => {
	try {
		dispatch({
			type: signupRequest,
		});

		const { data } = await axios.post(
			api.register,
			{ name, email, username, password },
			api.config
		);
		if (data) {
			dispatch(loginAction(email, password, '/home'));
		}

		//localStorage.setItem('token', JSON.stringify(token));
	} catch (error) {
		dispatch({
			type: signupFail,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export default registerAction;
