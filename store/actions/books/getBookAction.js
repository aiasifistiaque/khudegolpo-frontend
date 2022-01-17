import axios from 'axios';
import { api } from '../../../constants';
import {
	getBookRequest,
	getBookSuccess,
	getBookFail,
} from '../../storeConstants';

const getBookAction = id => async (dispatch, getState) => {
	try {
		const { token } = getState().auth;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				authorization: token,
			},
		};
		dispatch({ type: getBookRequest });
		const { data } = await axios.get(`${api.book}/${id}`, config);

		dispatch({ type: getBookSuccess, payload: data });
	} catch (error) {
		dispatch({
			type: getBookFail,
			payload:
				error.response && error.response
					? error.response.data.message
					: error.message,
		});
	}
};

export default getBookAction;
