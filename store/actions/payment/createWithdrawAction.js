import { api } from '../../../constants';
import axios from 'axios';
import {
	tokenName,
	createWithdrawRequest,
	createWithdrawSuccess,
	createWithdrawFail,
} from '../../storeConstants';
import getProfileAction from '../auth/getProfileAction';

const createWithdrawAction = withdraw => async (dispatch, getState) => {
	try {
		dispatch({
			type: createWithdrawRequest,
		});

		const token = JSON.parse(localStorage.getItem(tokenName));
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};

		const { data } = await axios.post(api.withdraw, withdraw, config);

		dispatch({
			type: createWithdrawSuccess,
			payload: data.doc,
		});
		dispatch(getProfileAction());
	} catch (error) {
		dispatch({
			type: createWithdrawFail,
			payload:
				error.response && error.response.data && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export default createWithdrawAction;
