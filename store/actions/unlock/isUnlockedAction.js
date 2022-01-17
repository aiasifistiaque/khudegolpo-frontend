import { api } from '../../../constants';
import axios from 'axios';
import {
	isUnlockedRequest,
	isUnlockedSuccess,
	isUnlockedFail,
} from '../../storeConstants';

const isUnlockedAction = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: isUnlockedRequest,
		});

		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};

		const { data } = await axios.get(`${api.unlock}/${id}`, config);

		dispatch({
			type: isUnlockedSuccess,
			payload: data.unlocked,
		});
	} catch (error) {
		dispatch({
			type: isUnlockedFail,
			payload:
				error.response && error.response.data && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export default isUnlockedAction;
